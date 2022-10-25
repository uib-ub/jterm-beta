<template>
  <div class="container py-2 p-0">
    <!--Filter-->
    <div class="d-flex justify-content-between align-items-center">
      <div class="container py-0">
        {{ searchDataFiltered.length }} {{ $t("searchFilter.results") }}
      </div>

      <div class="container"></div>
      <div class="container">
        <div
          v-if="searchDataPending"
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
      <div v-if="searchDataPending" class="card card-body text-center">
        <div
          class="spinner-border"
          style="width: 1.75rem; height: 1.75rem"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else class="card card-body">
        <div class="row row-cols-4">
          <div class="col">
            Languages
            <div class="form-check">
              <FilterCheckbox
                v-for="language in Object.keys(searchDataStats.lang)"
                ftype="lang"
                :fvalue="language"
              />
            </div>
          </div>
          <div class="col">
            Samling
            <div class="form-check">
              <FilterCheckbox
                v-for="samling in Object.keys(searchDataStats.samling)"
                ftype="samling"
                :fvalue="samling"
              />
            </div>
          </div>
          <div class="col">
            Label
            <div class="form-check">
              <FilterCheckbox
                v-for="predicate in Object.keys(searchDataStats.predicate)"
                ftype="predicate"
                :fvalue="predicate"
              />
            </div>
          </div>
          <div class="col">
            Match
            <div class="form-check">
              <FilterCheckbox
                v-for="matching in Object.keys(searchDataStats.matching)"
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
const searchDataFiltered = useSearchDataFiltered();
const searchDataStats = useSearchDataStats();
const searchFilterData = useSearchFilterData();
const searchDataPending = useSearchDataPending();
let calcInitialState: boolean = false;

interface SearchFilterActive {
  lang?: string[];
  samling?: string[];
  predicate?: string[];
  matching?: string[];
}

const searchFilterActive: SearchFilterActive = computed(() => {
  let filter: SearchFilterActive = {};
  try {
    Object.entries(searchFilterData.value).forEach(([k, v]) => {
      const lenStats = Object.keys(
        searchDataStats.value[k as keyof SearchDataStats]
      ).length;
      const lenFilter = v.length;
      if (lenStats == lenFilter) {
      } else {
        if (filter) {
          filter[k as keyof SearchFilterActive] = v;
        } else {
          filter = {};
          filter[k as keyof SearchFilterActive] = v;
        }
      }
    });
  } catch (e) {}
  return filter;
});

watch(searchData, () => {
  calcInitialState = true;
  searchDataStats.value = resetStats(searchDataStats.value, true);
  searchDataFiltered.value = searchData.value;
});

watch([searchDataFiltered, searchDataPending], () => {
  if (!searchDataPending.value) {
    if (calcInitialState) {
      searchDataStats.value = calcStatsSearchData(
        searchDataFiltered.value,
        searchDataStats.value,
        calcInitialState
      );
      calcInitialState = false;
      Object.keys(searchDataStats.value).forEach((category) => {
        searchFilterData.value[category] = Object.keys(
          searchDataStats.value[category as keyof SearchDataStats]
        );
      });
    }
    searchDataStats.value = resetStats(searchDataStats.value, false);
    searchDataStats.value = calcStatsSearchData(
      searchDataFiltered.value,
      searchDataStats.value
    );
  }
});

watch(
  searchFilterData,
  () => {
    searchDataFiltered.value = searchData.value.filter((match) =>
      filterData(match)
    );
  },
  { deep: true }
);

function filterData(match: SearchDataEntry) {
  if (searchFilterActive) {
    return Object.entries(searchFilterActive.value).every(
      ([filter, filterValue]) => {
        const matchValue = match[filter as keyof SearchFilterActive];
        if (typeof matchValue == "string") {
          if ((filterValue as string[]).includes(matchValue)) {
            return true;
          } else {
            return false;
          }
        } else {
          if (matchValue.every((v) => !filterValue.includes(v))) {
            return false;
          } else {
            return true;
          }
        }
      }
    );
  } else {
    return true;
  }
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
        const langFilter = searchFilterActive.value?.lang;
        if (initialCalc || !langFilter || langFilter.includes(l)) {
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

function resetStats(stats: SearchDataStats, deleteStats: boolean) {
  let newStats: SearchDataStats = Object.keys(searchDataStats.value).reduce(
    (o, category) => ({ ...o, [category]: {} }),
    {}
  );
  try {
    if (!deleteStats) {
      Object.keys(stats).forEach((key) => {
        Object.keys(stats[key as keyof SearchDataStats]).forEach(
          (nestedKey) => {
            newStats[key as keyof SearchDataStats][nestedKey] = 0;
          }
        );
      });
    }
    return newStats;
  } catch (e) {
    return newStats;
  }
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
