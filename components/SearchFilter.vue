<template>
  <div>
    <!--Filter-->
    <div class="flex h-9 justify-between text-lg">
      <div class="flex">
        <div class="w-16 pr-1 text-right">{{ count }}</div>
        <div>{{ $t("searchFilter.results") }}</div>
      </div>
      <TransitionOpacity>
        <div v-if="pending">
          <SpinnerIcon />
        </div>
      </TransitionOpacity>
      <div>
        <button
          class="xs:w-32 h-full w-20 rounded border border-solid border-gray-300 hover:bg-gray-100"
          type="button"
          :title="
            displayFilter
              ? $t('searchFilter.filterTitleHide')
              : $t('searchFilter.filterTitleShow')
          "
          :aria-label="
            displayFilter
              ? $t('searchFilter.filterTitleHide')
              : $t('searchFilter.filterTitleShow')
          "
          @click="displayFilter = !displayFilter"
        >
          {{ $t("searchFilter.filter") }}
          <span v-if="!displayFilter"
            ><Icon name="mdi:chevron-down" aria-hidden="true" /></span
          ><span v-else><Icon name="mdi:chevron-up" aria-hidden="true" /></span>
        </button>
      </div>
    </div>
    <div v-if="displayFilter" id="filterCard" class="mt-2 transition-all">
      <h2 class="pb-3 pt-1 text-2xl">{{ $t("searchFilter.filter") }}</h2>
      <div
        class="xs:grid-cols-2 grid grid-cols-1 gap-4 rounded border border-gray-300 p-2 md:grid-cols-4"
      >
        <div class="">
          <h3 class="text-xl">{{ $t("global.language") }}</h3>
          <div class="form-check">
            <FilterCheckbox
              v-for="language in intersectUnique(
                    languageOrder[$i18n.locale as LocalLangCode],
                    Object.keys(searchDataStats.lang || {})
                  )"
              :key="language"
              ftype="lang"
              :fvalue="language"
            />
          </div>
        </div>

        <div class="col">
          <h3 class="text-xl">{{ $t("global.termbase") }}</h3>
          <div class="form-check">
            <FilterCheckbox
              v-for="samling in Object.keys(
                searchDataStats.samling || {}
              ).sort()"
              :key="samling"
              ftype="samling"
              :fvalue="samling"
            />
          </div>
        </div>
        <div class="col">
          <h3 class="text-xl">{{ $t("searchFilter.termproperty") }}</h3>
          <div class="form-check">
            <FilterCheckbox
              v-for="predicate in intersectUnique(
                predicateOrder,
                Object.keys(searchDataStats.predicate || {})
              )"
              :key="predicate"
              ftype="predicate"
              :fvalue="predicate"
            />
          </div>
        </div>
        <div class="col">
          <h3 class="text-xl">{{ $t("searchFilter.matching") }}</h3>
          <div class="form-check">
            <FilterCheckbox
              v-for="matching in intersectUnique(
                matchingOrder,
                Object.keys(searchDataStats.matching || {})
              )"
              :key="matching"
              ftype="matching"
              :fvalue="matching"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchOptions } from "~~/composables/states";
import { LocalLangCode } from "~~/utils/vars-language";

const displayFilter = ref(false);

const searchData = useSearchData();
const searchDataStats = useSearchDataStats();
const searchFilterData = useSearchFilterData();
const searchDataPending = useSearchDataPending();
const searchOptions = useSearchOptions();
const searchFetchInitial = useSearchFetchInitial();
const pending = computed(() => {
  return !Object.values(searchDataPending.value).every((el) => !el);
});
const count = computed(() => {
  if (searchDataPending.value.aggregate) {
    return countSearchEntries(searchData.value);
  }
  try {
    return sum(Object.values(searchDataStats.value?.matching || []));
  } catch (e) {
    return 0;
  }
});

/*
  watch([searchDataFiltered, searchDataPending], () => {
    if (!searchDataPending.value) {
      if (calcInitialState) {
        const data = await fetchData(genSearchQuery())
  
        //searchDataStats.value = calcStatsSearchData(
        //  searchDataFiltered.value,
        //  searchDataStats.value,
        //  calcInitialState
        //);
        calcInitialState = false;
      }
      searchDataStats.value = resetStats(searchDataStats.value, false);
      searchDataStats.value = calcStatsSearchData(
        searchDataFiltered.value,
        searchDataStats.value
      );
    }
  });
  */

watch(
  searchFilterData,
  () => {
    if (searchFetchInitial.value) {
      searchFetchInitial.value = false;
    } else {
      const newOptions: SearchOptions = {
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
        searchMatching:
          searchFilterData.value.matching.length > 0
            ? searchFilterData.value.matching
            : searchOptions.value.searchMatching,
        searchLimit: searchOptions.value.searchLimit,
        searchOffset: searchOptions.value.searchOffset,
      };
      useFetchSearchData(newOptions, "filter");
    }
  },
  { deep: true }
);

/*
  function filterData(match: SearchDataEntry) {
    return Object.entries(searchFilterData.value).every(
      ([filter, filterValue]) => {
        if (!filterValue.length) {
          return true;
        } else {
          const matchValue = match[filter as keyof SearchFilterData];
          if (Array.isArray(matchValue)) {
            if (matchValue.every((v: string) => !filterValue.includes(v))) {
              return false;
            } else {
              return true;
            }
          } else {
            if (filterValue.includes(matchValue)) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
    );
  }
  */

/*
  function calcStatsSearchData(
    data: SearchDataEntry[],
    stats: SearchDataStats,
    initialCalc?: boolean
  ) {
    const newStats = {
      lang: { ...stats.lang },
      samling: { ...stats.samling },
      predicate: { ...stats.predicate },
      matching: { ...stats.matching },
    };
  
    data.forEach((match) => {
      try {
        match.lang.forEach((l) => {
          const langFilter = searchFilterData.value?.lang;
          if (initialCalc || langFilter || langFilter.includes(l)) {
            newStats.lang[l] = newStats.lang[l] + 1 || 1;
          }
        });
        newStats.samling[match.samling] =
          newStats.samling[match.samling] + 1 || 1;
        newStats.predicate[match.predicate] =
          newStats.predicate[match.predicate] + 1 || 1;
        newStats.matching[match.matching] =
          newStats.matching[match.matching] + 1 || 1;
      } catch (e) {}
    });
    return newStats;
  }
  */
</script>
