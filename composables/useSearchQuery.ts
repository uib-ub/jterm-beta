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
      where: `{ ?label skosxl:literalForm ?lit
              NOT EXISTS {
                ?label text:query ("${searchStarred}")
              }
            }`,
      filter: `FILTER ( contains(lcase(?lit), lcase("${searchTerm}")){langfilter} ).`,
      langfilter: `LANGMATCHES(LANG(?lit), {language})`,
    },
  };

  const subqueryArray: string[] = [];
  matching.forEach((match) => {
    const whereArray: string[] = [];
    const langfilterArray: string[] = [];
    if (match == "contains-ci") {
      whereArray.push(content["contains-ci"].where);
    }
    language.forEach((lang) => {
      if (match == "contains-ci") {
        if (lang) {
          langfilterArray.push(
            content["contains-ci"].langfilter.replace("{language}", `"${lang}"`)
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
    const langfilter = langfilterArray.join(` || \n${" ".repeat(23)}`);
    let filter = "";
    if (match == "contains-ci") {
      if (language[0]) {
        filter = content[match].filter.replace(
          "{langfilter}",
          ` &&\n${" ".repeat(21)}( ${langfilter} )`
        );
      } else {
        filter = content[match].filter.replace("{langfilter}", "");
      }
    } else {
      filter = content[match].filter;
    }

    const subqueryTemplate = `
        {
          SELECT ?label (?sc + ${content[match].score} as ?score) (str(?lit) as ?literal) ?l ("${match}" as ?matching)
          WHERE {
            ${where}
            ${content[match].filter}
            BIND (lang(?lit) as ?l).
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
