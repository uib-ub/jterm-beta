<template>
  <div>
    <Head>
      <Title> {{ $t("search.title") }} | {{ $t("index.title") }} </Title>
    </Head>
    <h1 class="sr-only">{{ $t("search.title") }}</h1>
    <SearchFilter />
    <div>
      <h2 id="resultsheading" class="py-3 text-2xl">
        {{ $t("searchFilter.results-heading") }}
      </h2>
      <table
        v-if="searchData.length > 0"
        ref="scrollComponent"
        class="w-full table-auto"
        aria-labelledby="resultsheading"
      >
        <thead class="bg-gray-100">
          <tr class="text-lg">
            <th>
              {{ $t("search.term") }}
              <span v-if="searchOptions.searchLanguage !== 'all'">{{
                $t("global.lang." + searchOptions.searchLanguage)
              }}</span>
            </th>
            <th v-if="searchOptions.searchLanguage === 'all'">
              {{ $t("search.language") }}
            </th>
            <th v-if="searchOptions.searchTranslate !== 'none'">
              {{ $t("search.term") }}
              {{ $t("global.lang." + searchOptions.searchTranslate) }}
            </th>
            <th>{{ $t("search.termbase") }}</th>
          </tr>
        </thead>
        <tbody>
          <SearchResultEntry
            v-for="entry in searchData"
            :key="entry.link + '_' + entry.label"
            :entry-data="entry"
          />
        </tbody>
      </table>
    </div>
    <div class="flex justify-center p-2">
      <div v-if="pending && countFetchedMatches > 30" role="status">
        <span class="">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Matching, MatchingNested } from "../utils/vars";
import { SearchOptions } from "../composables/states";
const searchData = useSearchData();
const searchFilterData = useSearchFilterData();
const searchDataStats = useSearchDataStats();
const countFetchedMatches = computed(() => {
  return countSearchEntries(searchData.value);
});
const searchOptions = useSearchOptions();
const count = computed(() => {
  try {
    return sum(Object.values(searchDataStats.value?.matching || [])) || 0;
  } catch (e) {
    return 0;
  }
});

const searchDataPending = useSearchDataPending();
const pending = computed(() => {
  return !Object.values(searchDataPending.value).every((el) => !el);
});

const scrollComponent = ref(null);

onMounted(() => {
  window.addEventListener("scroll", fetchFurtherSearchData);
});
onUnmounted(() => {
  window.removeEventListener("scroll", fetchFurtherSearchData);
});

const fetchFurtherSearchData = () => {
  const searchFetchLatest = useSearchFetchLatest();
  const element = scrollComponent.value;
  if (count.value > countFetchedMatches.value && !pending.value) {
    if (element.getBoundingClientRect().bottom * 0.75 < window.innerHeight) {
      const offset: SearchOptions["searchOffset"] = {};

      if (searchOptions.value.searchTerm.length > 0) {
        let newOffsetCalc;
        let oldOffsetCalc = countFetchedMatches.value;
        let fetchNextMatching = false;

        let searchMatching: Matching[] | MatchingNested[];
        if (typeof searchOptions.value.searchMatching === "string") {
          searchMatching = [searchOptions.value.searchMatching];
        } else {
          searchMatching = searchOptions.value.searchMatching;
        }

        for (const match of searchMatching.flat()) {
          if (
            Object.keys(searchDataStats.value.matching || []).includes(match)
          ) {
            const matchCount =
              searchDataStats.value.matching?.[match as Matching] || 0;
            if (fetchNextMatching) {
              offset[match as Matching] = 0;
            }
            if (oldOffsetCalc < 0) {
              break;
            }
            newOffsetCalc = oldOffsetCalc - matchCount;
            if (newOffsetCalc < 0) {
              offset[match as Matching] = oldOffsetCalc;
            }
            const nextfetchCalc = matchCount - oldOffsetCalc;
            if (
              nextfetchCalc > 0 &&
              nextfetchCalc < searchOptions.value.searchLimit
            ) {
              fetchNextMatching = true;
            }
            oldOffsetCalc = newOffsetCalc;
          }
        }
      } else {
        offset["all"] = countFetchedMatches.value;
      }
      const newOptions = {
        searchTerm: searchOptions.value.searchTerm,
        searchBase:
          searchFilterData.value.samling.length > 0
            ? searchFilterData.value.samling
            : searchOptions.value.searchBase,
        searchDomain: searchOptions.value.searchDomain,
        searchLanguage:
          searchFilterData.value.lang.length > 0
            ? searchFilterData.value.lang
            : searchOptions.value.searchLanguage,
        searchPredicate:
          searchFilterData.value.predicate.length > 0
            ? searchFilterData.value.predicate
            : searchOptions.value.searchPredicate,
        searchTranslate: searchOptions.value.searchTranslate,
        searchMatching: Object.keys(offset),
        searchLimit: searchOptions.value.searchLimit,
        searchOffset: offset,
      };
      const fetchTime = Date.now();
      searchFetchLatest.value = fetchTime;
      useFetchSearchData(newOptions, "further", Object.keys(offset));
    }
  }
};
</script>
