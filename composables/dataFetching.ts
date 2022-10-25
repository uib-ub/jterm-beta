import { SearchDataEntry } from "./states";

const matching = ["full-cs", "full-ci", "startsWith-ci", "subWord-ci"];
let lastFetch = NaN;

export async function fetchData(query: string, accept?: string) {
  const url = "https://sparql.terminologi.no/termwiki_test/query";
  return await $fetch(url, {
    method: "post",
    body: query,
    headers: {
      "Content-type": "application/sparql-query",
      Referer: "https://term.uib.no/",
    },
  });
}

export async function fetchSearchDataMatching(
  matching: string[],
  dataState: SearchDataEntry[],
  append: boolean,
  tmpid: number
) {
  const data = await fetchData(useSearchQuery(matching));
  if (append) {
    dataState.value = dataState.value.concat(
      data.results.bindings.map(processBindings)
    );
  } else {
    dataState.value = data.results.bindings.map(processBindings);
  }
}
export async function fetchSearchData(dataState: SearchDataEntry[]) {
  const searchOptions = useSearchOptions();
  const searchDataPending = useSearchDataPending();
  let append = false;

  searchDataPending.value = true;
  const matching = ["full", "startsWith", "subWord"];
  for (const m of matching) {
    if (searchOptions.value.searchMatching.includes(m)) {
      await fetchSearchDataMatching(m, dataState, append);
      append = true;
    }
  }
  searchDataPending.value = false;
}
