<template>
  <div class="container py-2 p-0">
    <!--Filter-->
    <div class="d-flex justify-content-between align-items-center">
      <div class="container py-0">
        {{ count }} {{ $t("searchFilter.results") }}
      </div>

      <div class="container"></div>
      <div class="container">
        <div
          v-if="pending"
          class="spinner-border"
          style="width: 1.75rem; height: 1.75rem"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="container"></div>
      <button
        class="btn tp-filter-btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#filterCard"
        aria-expanded="false"
        aria-controls="filterCard"
      >
        Filter
      </button>
    </div>
    <div class="collapse mt-2" id="filterCard">
      <div class="card card-body">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          <div class="col">
            Languages
            <div class="form-check">
              <FilterCheckbox
                v-for="language in intersectUnique(
                  languageOrder[$i18n.locale],
                  Object.keys(searchDataStats.lang)
                )"
                ftype="lang"
                :fvalue="language"
              />
            </div>
          </div>
          <div class="col">
            Samling
            <div class="form-check">
              <FilterCheckbox
                v-for="samling in Object.keys(searchDataStats.samling).sort()"
                ftype="samling"
                :fvalue="samling"
              />
            </div>
          </div>
          <div class="col">
            Label [dummy]
            <div class="form-check">
              <FilterCheckbox
                v-for="predicate in intersectUnique(
                  predicateOrder,
                  Object.keys(searchDataStats.predicate)
                )"
                ftype="predicate"
                :fvalue="predicate"
              />
            </div>
          </div>
          <div class="col">
            Match
            <div class="form-check">
              <FilterCheckbox
                v-for="matching in intersectUnique(
                  matchingOrder,
                  Object.keys(searchDataStats.matching)
                )"
                ftype="matching"
                :fvalue="matching"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchDataEntry, SearchDataStats } from "~~/composables/states";

const searchData = useSearchData();
const searchDataStats = useSearchDataStats();
const searchFilterData = useSearchFilterData();
const searchDataPending = useSearchDataPending();
const searchOptions = useSearchOptions();
let calcInitialState: boolean = false;
const pending = computed(() => {
  return !Object.values(searchDataPending.value).every((el) => !el);
});
const count = computed(() => {
  if (searchDataPending.value["aggregate"]) {
    return countSearchEntries(searchData.value);
  }
  {
    try {
      return sum(Object.values(searchDataStats.value?.["matching"])) || 0;
    } catch (e) {
      return 0;
    }
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
    if (calcInitialState) {
      calcInitialState = false;
    } else {
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

function filterData(match: SearchDataEntry) {
  return Object.entries(searchFilterData.value).every(
    ([filter, filterValue]) => {
      if (!filterValue.length) {
        return true;
      } else {
        const matchValue = match[filter];
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
</script>

<style>
.tp-filter-btn {
  border: none;
  width: 400px;
  height: 40px;
  color: var(--tp-dark);
  background-color: var(--tp-light);
}
</style>
