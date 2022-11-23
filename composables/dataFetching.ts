import { SearchDataEntry, SearchDataStats, SearchOptions } from "./states";

let lastFetch = NaN;

export async function fetchData(query: string, accept?: string) {
  const url = "https://sparql.terminologi.no/termwiki_test/query";
  return await $fetch(url, {
    method: "post",
    body: query,
    headers: {
      "Content-type": "application/sparql-query",
      Referer: "https://term.uib.no/",
      Accept: accept || "application/json",
    },
  });
}

export async function fetchSearchDataMatching(
  searchOptions: SearchOptions,
  matching: string[],
  dataState: SearchDataEntry[],
  append: boolean,
  tmpid?: number
) {
  const data = await fetchData(
    genSearchQuery(searchOptions, "entries", matching)
  );
  if (!tmpid || tmpid == lastFetch) {
    if (append) {
      dataState.value = dataState.value.concat(
        data.results.bindings.map(processBinding)
      );
    } else {
      dataState.value = data.results.bindings.map(processBinding);
    }
  }
}

async function fetchSearchDataCount(
  searchOptions: SearchOptions,
  matching: string[]
) {
  return await fetchData(genSearchQuery(searchOptions, "count", matching));
}

export async function fetchSearchDataAggregate(
  searchOptions: SearchOptions,
  matching: string[]
) {
  const data = await fetchData(
    genSearchQuery(searchOptions, "aggregate", matching)
  );
  return data.results?.bindings.reduce((o, key) => sumAggregateData(o, key), {})
}

export async function fetchSearchData(
  searchOptions: SearchOptions,
  dataState: SearchDataEntry[],
  filter: boolean
) {
  const searchDataPending = useSearchDataPending();
  const searchDataCount = useSearchDataCount();
  const searchDataStats = useSearchDataStats();
  let append = false;
  searchDataPending.value = true;
  const fetchTime = Date.now();
  lastFetch = fetchTime;
  let searchMatching = ["all"];
  if (searchOptions.searchTerm.length > 0) {
    searchMatching = searchOptions.searchMatching
  }
  searchDataCount.value = { results: { bindings: [] } };
  searchDataCount.value = await fetchSearchDataCount(
    searchOptions,
    searchMatching
  );

  if (filter) {
    const zeroedStats = resetStats(searchDataStats.value, false);
    const newStats = await fetchSearchDataAggregate(
      searchOptions,
      searchMatching
    );
    for (const category of Object.keys(zeroedStats)) {
      searchDataStats.value[category as keyof SearchDataStats] = {
        ...zeroedStats[category as keyof SearchDataStats],
        ...newStats[category],
      };
    }
  } else {
    searchDataStats.value = await fetchSearchDataAggregate(
      searchOptions,
      searchMatching
    );
  }

  if (searchOptions.searchOffset > 0) {
    await fetchSearchDataMatching(
      searchOptions,
      searchMatching,
      dataState,
      append,
      fetchTime
    );
  } else {
    for (const m of searchMatching) {
      if (m == "all" || searchOptions.searchMatching.includes(m)) {
        await fetchSearchDataMatching(
          searchOptions,
          [m],
          dataState,
          append,
          fetchTime
        );
        append = true;
        if (fetchTime != lastFetch) {
          break;
        }
        if (dataState.value.length > searchOptions.searchLimit) {
          break;
        }
      }
    }
  }
  searchDataPending.value = false;
}
