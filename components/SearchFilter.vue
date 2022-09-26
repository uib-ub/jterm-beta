<template>
  <div class="container py-2 p-0">
    <!--Filter-->
    <div class="d-flex justify-content-betweem align-items-center">
      <div class="container py-0">
        {{ searchData.length }} {{ $t("searchFilter.results") }}
      </div>
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
    <div class="collapse" id="filterCard">
      <div class="card card-body">
        <div class="row row-cols-4">
          <div class="col">
            Languages
            <div class="form-check">
              <FilterCheckbox
                v-for="language in Object.keys(searchDataStats?.lang)"
                ftype="lang"
                :fvalue="language"
              />
            </div>
          </div>
          <div class="col">
            Samling
            <div class="form-check">
              <FilterCheckbox
                v-for="samling in Object.keys(searchDataStats?.samling)"
                ftype="samling"
                :fvalue="samling"
              />
            </div>
          </div>
          <div class="col">
            Label
            <div class="form-check">
              <FilterCheckbox
                v-for="predicate in Object.keys(searchDataStats?.predicate)"
                ftype="predicate"
                :fvalue="predicate"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchData = useSearchData();
const searchDataFiltered = useSearchDataFiltered();
const searchDataStats = useSearchDataStats();
const searchFilterData = useSearchFilterData();
let calcInitialState: boolean;

watch(searchData, () => {
  calcInitialState = true;
  searchDataFiltered.value = searchData.value;
  searchDataStats.value = resetStats(searchDataStats.value, true);
  searchDataStats.value = calcStatsSearchData(
    searchData.value,
    searchDataStats.value
  );
  searchFilterData.value.lang = Object.keys(searchDataStats.value.lang);
  searchFilterData.value.samling = Object.keys(searchDataStats.value.samling);
  searchFilterData.value.predicate = Object.keys(
    searchDataStats.value.predicate
  );
});

watch(searchDataFiltered, () => {
  if (calcInitialState == true) {
    calcInitialState = false;
  } else {
    searchDataStats.value = resetStats(searchDataStats.value, false);
    searchDataStats.value = calcStatsSearchData(
      searchDataFiltered.value,
      searchDataStats.value
    );
  }
});

function calcStatsSearchData(data, stats) {
  const newStats = {
    lang: { ...stats.lang },
    samling: { ...stats.samling },
    predicate: { ...stats.predicate },
  };
  data.forEach((match) => {
    try {
      newStats.lang[match.lang] = newStats.lang[match.lang] + 1 || 1;
      newStats.samling[match.samling] =
        newStats.samling[match.samling] + 1 || 1;
      newStats.predicate[match.predicate] =
        newStats.predicate[match.predicate] + 1 || 1;
    } catch (e) {}
  });
  return newStats;
}

function resetStats(stats, deleteStats: boolean) {
  try {
    let newStats = { lang: {}, samling: {}, predicate: {} };
    if (deleteStats) {
    } else {
      Object.keys(stats).forEach((key) => {
        Object.keys(stats[key]).forEach((nestedKey) => {
          newStats[key][nestedKey] = 0;
        });
      });
    }
    return newStats;
  } catch (e) {
    return {};
  }
}
</script>

<style>
.tp-filter-btn {
  border: none;
  width: 115px;
  height: 40px;
  color: var(--tp-dark);
  background-color: var(--tp-light);
}
</style>
