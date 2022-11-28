import {
  SearchDataEntry,
  SearchDataStats,
  SearchOptions,
} from "./states";

export async function fetchSearchDataMatching(
  searchOptions: SearchOptions,
  matching: string[],
  append: boolean,
  currentFetch: number
) {
  const searchData = useSearchData();
  const searchFetchLatest = useSearchFetchLatest();
  const data = await fetchData(
    genSearchQuery(searchOptions, "entries", matching)
  );
  if (currentFetch == searchFetchLatest.value) {
    if (append) {
      searchData.value = searchData.value.concat(
        data.results.bindings.map(processBinding)
      );
    } else {
      searchData.value = data.results.bindings.map(processBinding);
    }
  }
}

async function fetchSearchDataAggregate(
  searchOptions: SearchOptions,
  matching: string[],
  type: FetchType,
  currentFetch: number
) {
  const searchDataStats = useSearchDataStats();
  const searchFetchLatest = useSearchFetchLatest();
  const searchDataPending = useSearchDataPending();
  const data = await fetchData(
    genSearchQuery(searchOptions, "aggregate", matching)
  );
  const newStats = data.results?.bindings.reduce(
    (o, key) => sumAggregateData(o, key),
    {}
  );
  if (currentFetch === searchFetchLatest.value) {
    if (type === "initial") {
      searchDataStats.value = newStats;
    } else if (type === "filter") {
      const zeroedStats = resetStats(searchDataStats.value, false);
      for (const category of Object.keys(zeroedStats)) {
        searchDataStats.value[category as keyof SearchDataStats] = {
          ...zeroedStats[category as keyof SearchDataStats],
          ...newStats[category],
        };
      }
    }
    searchDataPending.value["aggregate"] = false;
  }
}

type FetchType = "initial" | "filter" | "further";

export async function useFetchSearchData(
  searchOptions: SearchOptions,
  fetchType: FetchType,
  matching?: string[]
) {
  const searchData = useSearchData();
  const searchFetchLatest = useSearchFetchLatest();
  const searchDataPending = useSearchDataPending();
  const searchFilterData = useSearchFilterData();
  const searchFetchInitial = useSearchFetchInitial();
  let append = false;
  const fetchTime = Date.now();
  searchFetchLatest.value = fetchTime;

  let searchMatching = matching || ["all"];
  if (!matching || searchOptions.searchTerm.length > 0) {
    searchMatching = searchOptions.searchMatching;
  }

  if (fetchType == "initial") {
    searchFetchInitial.value = true;
    searchFilterData.value = {
      lang: [],
      samling: [],
      predicate: [],
      matching: [],
    };
  }

  if (fetchType === "initial" || fetchType === "filter") {
    searchDataPending.value["aggregate"] = true;
    fetchSearchDataAggregate(
      searchOptions,
      searchMatching.flat(),
      fetchType,
      fetchTime
    );
  }

  if (fetchType === "further") {
    append = true;
  }

  searchDataPending.value["entries"] = true;
  for (const m of searchMatching) {
    await fetchSearchDataMatching(
      searchOptions,
      Array.isArray(m) ? m : [m],
      append,
      fetchTime
    );
    append = true;
    if (fetchTime != searchFetchLatest.value) {
      break;
    }
    if (searchData.value.length >= searchOptions.searchLimit) {
      break;
    }
  }
  if (fetchTime == searchFetchLatest.value) {
    searchDataPending.value["entries"] = false;
  }
}
