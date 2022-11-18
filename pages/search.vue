<template>
  <div>
    <Head>
      <Title> {{ $t("search.title") }} | {{ $t("index.title") }} </Title>
    </Head>
    <SearchFilter />
    <div class="list-group" ref="scrollComponent">
      <SearchResultEntry
        v-for="entry in searchDataFiltered"
        :entryData="entry"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const searchDataFiltered = useSearchDataFiltered();
const searchFilterData = useSearchFilterData();
const searchDataStats = useSearchDataStats();
const countMatches = computed(() => {
  const langNumbers = searchDataFiltered.value.map((entry) => {
    return entry.lang.length;
  });
  return sum(langNumbers);
});
const searchOptions = useSearchOptions();
const searchDataCount = useSearchDataCount();
const countValues = computed(() => {
  return (
    searchDataCount.value?.results.bindings.map((binding) => {
      if (binding.count) {
        return parseInt(binding.count.value);
      } else {
        return 0;
      }
    }) || [0]
  );
});
const count = computed(() => {
  return countValues.value.reduce((partial, current) => partial + current, 0);
});

const scrollComponent = ref(null);
const fetchFurtherPending = ref(false);
const fetchFurtherSearchData = () => {
  let element = scrollComponent.value;
  if (count.value > countMatches.value && !fetchFurtherPending.value) {
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      fetchFurtherPending.value = true;

      let newOffsetCalc;
      let oldOffsetCalc = countMatches.value;
      let fetchNextMatching = false;
      const offset = {};
      for (const match of searchOptions.value.searchMatching) {
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
        searchMatching: Object.keys(offset),
        searchLimit: searchOptions.value.searchLimit,
        searchOffset: offset,
      };
      fetchSearchDataMatching(
        newOptions,
        Object.keys(offset),
        searchDataFiltered,
        true
      );
      setTimeout(function () {
        fetchFurtherPending.value = false;
      }, 500);
    }
  }
};
</script>
