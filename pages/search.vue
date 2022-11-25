<template>
  <div>
    <Head>
      <Title> {{ $t("search.title") }} | {{ $t("index.title") }} </Title>
    </Head>
    <SearchFilter />
    <div class="list-group" ref="scrollComponent">
      <SearchResultEntry
        v-for="entry in searchData"
        :entryData="entry"
      />
    </div>
    <div class="d-flex justify-content-center p-2">
      <div
        v-if="pending && countFetchedMatches > 30"
        class="spinner-border"
        style="width: 1.75rem; height: 1.75rem"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchData = useSearchData();
const searchFilterData = useSearchFilterData();
const searchDataStats = useSearchDataStats();
const countFetchedMatches = computed(() => {
  return countSearchEntries(searchData.value);
});
const searchOptions = useSearchOptions();
const count = computed(() => {
  try {
    return sum(Object.values(searchDataStats.value?.["matching"])) || 0;
  } catch (e) {
    return 0;
  }
});

const searchDataPending = useSearchDataPending();
const pending = computed(() => {
  return !Object.values(searchDataPending.value).every((el) => !el)
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
  let element = scrollComponent.value;
  if (count.value > countFetchedMatches.value && !pending.value) {
    if (element.getBoundingClientRect().bottom * 0.75 < window.innerHeight) {

      let newOffsetCalc;
      let oldOffsetCalc = countFetchedMatches.value;
      let fetchNextMatching = false;
      const offset = {};
      for (const match of searchOptions.value.searchMatching.flat()) {
        if (Object.keys(searchDataStats.value.matching).includes(match)) {
          const matchCount = searchDataStats.value.matching[match];
          if (fetchNextMatching) {
            offset[match] = 0;
          }
          if (oldOffsetCalc < 0) {
            break;
          }
          newOffsetCalc = oldOffsetCalc - matchCount;
          if (newOffsetCalc < 0) {
            offset[match] = oldOffsetCalc;
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
      const newOptions = {
        searchTerm: searchOptions.value.searchTerm,
        searchBase:
          searchFilterData.value.samling.length > 0
            ? searchFilterData.value.samling
            : searchOptions.value.searchBase,
        searchLanguage:
          searchFilterData.value.lang.length > 0
            ? searchFilterData.value.lang
            : searchOptions.value.searchLanguage,
        searchTranslate: searchOptions.value.searchTranslate,
        searchMatching: Object.keys(offset),
        searchLimit: searchOptions.value.searchLimit,
        searchOffset: offset,
      };
      const fetchTime = Date.now();
      searchFetchLatest.value = fetchTime;

      fetchSearchData(
        newOptions,
        "further",
        Object.keys(offset)
      );
      /*
      fetchSearchDataMatching(
        newOptions,
        Object.keys(offset),
        searchDataFiltered,
        true,
        fetchTime
      );
      setTimeout(function () {
        fetchFurtherPending.value = false;
      }, 500);
      */
    }
  }
};
</script>
