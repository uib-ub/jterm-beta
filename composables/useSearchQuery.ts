import { SearchOptions } from "./states";

export function useSearchQuery(
  searchOptions: SearchOptions,
  matching: string[]
) {
  const htmlHighlightOpen = "<span class='searchHighlight'>";
  const htmlHighlightClose = "</span>";
  const queryHighlight = `highlight:s:${htmlHighlightOpen} | e:${htmlHighlightClose}`;

  let searchTerm = searchOptions.searchTerm;
  const searchStarred = searchTerm
    .split(" ")
    .map((t) => t + "*")
    .join(" AND ");
  const searchDoubleStarred = searchTerm
    .split(" ")
    .map((t) => "*" + t + "*")
    .join(" AND ");

  let graph = "GRAPH <urn:x-arq:UnionGraph>";
  if (Array.isArray(searchOptions.searchBase)) {
    const bases = searchOptions.searchBase
      .map((base) => `(<http://spraksamlingane.no/terminlogi/named/${base}>)`)
      .join("");
    graph = `VALUES (?G) {${bases}} GRAPH ?G`;
  }
  const language = (() => {
    if (searchOptions.searchLanguage) {
      return [searchOptions.searchLanguage];
    } else {
      return [""];
    }
  })();

  const content = {
    all: {
      score: 0,
      where: `{ SELECT ?label ?lit (0 as ?sc)
                WHERE {
                  ?label skosxl:literalForm ?lit.
                {languageFilter}
                }
                LIMIT ${searchOptions.searchLimit}
            }`,
      filter: "",
    },
    "full-cs": {
      score: 400,
      where: `{ (?label ?sc ?lit) text:query ("\\"${searchTerm}\\"" "${queryHighlight}" {language}). }`,
      filter: `FILTER ( str(?lit) = "${htmlHighlightOpen}${searchTerm}${htmlHighlightClose}" ).`,
    },
    "full-ci": {
      score: 300,
      where: `{ (?label ?sc ?lit) text:query ("\\"${searchTerm}\\"" "${queryHighlight}" {language}). }`,
      filter: `FILTER ( lcase(str(?lit)) = lcase("${htmlHighlightOpen}${searchTerm}${htmlHighlightClose}") &&
                     str(?lit) != "${htmlHighlightOpen}${searchTerm}${htmlHighlightClose}" ).`,
    },
    "startsWith-ci": {
      score: 200,
      where: `{ (?label ?sc ?lit) text:query ("${searchStarred}" "${queryHighlight}" {language}). }`,
      filter: `FILTER ( strstarts(lcase(?lit), lcase("${htmlHighlightOpen}${searchTerm}") ) &&
                     lcase(str(?lit)) != lcase("${htmlHighlightOpen}${searchTerm}${htmlHighlightClose}") ).`,
    },
    "subWord-ci": {
      score: 100,
      where: `{ (?label ?sc ?lit) text:query ("${searchStarred}" "${queryHighlight}" {language}). }`,
      filter: `FILTER ( !strstarts(lcase(?lit), lcase("${htmlHighlightOpen}${searchTerm}")) ).`,
    },
    "contains-ci": {
      score: 0,
      where: `{ (?label ?sc ?lit) text:query ("(${searchDoubleStarred}) NOT (${searchStarred})" "${queryHighlight}" {language}). }`,
      filter: `FILTER ( !strstarts(lcase(?lit), lcase("${htmlHighlightOpen}${searchTerm}")) ).`,
    },
  };

  const subqueryArray: string[] = [];
  matching.forEach((match) => {
    const whereArray: string[] = [];
    const langfilterArray: string[] = [];

    language.forEach((lang) => {
      if (match == "all") {
        if (!lang) {
          whereArray.push(content[match].where.replace("{languageFilter}", ""));
        } else {
          whereArray.push(
            content[match].where.replace(
              "{languageFilter}",
              `FILTER ( langmatches(lang(?lit), "${lang}") )`
            )
          );
        }
      } else {
        if (!lang) {
          whereArray.push(content[match].where.replace("{language}", ""));
        } else {
          whereArray.push(
            content[match].where.replace("{language}", `"lang:${lang}"`)
          );
        }
      }
    });
    const where = whereArray.join("\n            UNION\n            ");

    const subqueryTemplate = `
        {
          SELECT ?label ?literal ?l (?sc + ${content[match].score} as ?score)
                 ("${match}" as ?matching)
          WHERE {
            ${where}
            ${content[match].filter}
            BIND ( lang(?lit) as ?l ).
            BIND ( str(?lit) as ?literal )
          }
          ORDER BY DESC(?score) lcase(?literal)
          LIMIT ${searchOptions.searchLimit}
        }`;
    subqueryArray.push(subqueryTemplate);
  });
  const subquery = subqueryArray.join("\n        UNION\n");

  let query = `
  PREFIX skosxl: <http://www.w3.org/2008/05/skos-xl#>
  PREFIX skosp: <http://www.data.ub.uib.no/ns/spraksamlingene/skos#>
  PREFIX text: <http://jena.apache.org/text#>

  SELECT DISTINCT ?uri ?predicate ?literal ?samling ?score
         (group_concat( ?l; separator="," ) as ?lang)
         ?matching
  WHERE {
    ${graph}
    {
      {
        ${subquery}
      }
      ?uri ?predicate ?label;
        skosp:memberOf ?samling.
    }
  }
  GROUP BY ?uri ?predicate ?literal ?samling ?score ?matching
  ORDER BY DESC(?score) lcase(?literal) DESC(?predicate)
  LIMIT ${searchOptions.searchLimit}`;

  return query;
}
