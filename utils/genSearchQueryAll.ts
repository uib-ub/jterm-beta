import { SearchOptions } from "../composables/states";

export function genSearchQueryAll(
  searchOptions: SearchOptions,
  graph,
  language
) {
  let languageFilter: string;
  if (language[0] === "") {
    languageFilter = "";
  } else {
    const languageFilterExp = language
      .map((lang) => `langmatches(lang(?literal), '${lang}')`)
      .join("     \n || ");
    languageFilter = `FILTER ( ${languageFilterExp} )`;
  }

  const translate =
    searchOptions.searchTranslate !== "none" ? "?translate" : "";
  const translateOptional =
    searchOptions.searchTranslate !== "none"
      ? `OPTIONAL { ?uri skosxl:prefLabel ?label2 .
                     ?label2 skosxl:literalForm ?translate .
                     FILTER ( langmatches(lang(?translate), '${searchOptions.searchTranslate}') ) }`
      : "";

  const innerQuery = `
    { SELECT ?uri ?predicate ?label ?literal (0 as ?sc) ?s ${translate}
      WHERE {
        GRAPH ${graph[1]} {
          {
          ?label skosxl:literalForm ?literal.
          ${languageFilter}
          ?uri ?predicate ?label;
               skosp:memberOf ?s.
          ${translateOptional}
          }
        }
      }
      ORDER BY lcase(str(?lit))
      LIMIT ${searchOptions.searchLimit}
      OFFSET ${searchOptions.searchOffset?.all || 0}
    }`;

  const outerQuery = `
  PREFIX skosxl: <http://www.w3.org/2008/05/skos-xl#>
  PREFIX skosp: <http://www.data.ub.uib.no/ns/spraksamlingene/skos#>
  PREFIX text: <http://jena.apache.org/text#>
  PREFIX ns: <http://spraksamlingane.no/terminlogi/named/>

  SELECT DISTINCT ?uriEnc ?predicate ?literal ?samling (0 as ?score)
         (group_concat( lang(?literal); separator="," ) as ?lang)
         ("all" as ?matching) ${translate}
  ${graph[0]}
  WHERE {
      { SELECT ?label ?literal ?l ?uriEnc ?predicate ?samling ${translate}
        WHERE {
                 ${innerQuery}
          BIND ( replace(str(?uri), "http://.*wiki.terminologi.no/index.php/Special:URIResolver/", "") as ?uriProc).
          BIND ( replace(?uriProc, "/", "%2F") as ?uriEnc).
          BIND ( replace(str(?s), "http://.*wiki.terminologi.no/index.php/Special:URIResolver/.*-3A", "") as ?samling).
        }
        ORDER BY ?literal
        LIMIT ${searchOptions.searchLimit}
    }
  }
  GROUP BY ?uriEnc ?predicate ?literal ?samling ?score ?matching ${translate}
  ORDER BY lcase(?literal) DESC(?predicate)
  LIMIT ${searchOptions.searchLimit}
  `;

  return outerQuery;
}