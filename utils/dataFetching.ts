import { SearchQueryResponse } from "./vars";

export async function fetchData(
  query: string,
  accept?: string
): Promise<SearchQueryResponse> {
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
