import { SearchOptions } from "./states";

export function useSearchQuery(
  searchOptions: SearchOptions,
  queryType: string,
  matching: string[]
) {
  const htmlHighlightOpen = "<span class='searchHighlight'>";
  const htmlHighlightClose = "</span>";
  const queryHighlight = () =>
    `highlight:s:${htmlHighlightOpen} | e:${htmlHighlightClose}`;

  let searchTerm = searchOptions.searchTerm;
  const searchStarred = () =>
    searchTerm
      .split(" ")
      .map((t) => t + "*")
      .join(" AND ");
  const searchDoubleStarred = () =>
    searchTerm
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

  const subqueries = (queryType: string, matching: string) => {
    const content = {
      entries: {
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
          where: `{ (?label ?sc ?lit) text:query ("\\"${searchTerm}\\"" "${queryHighlight()}" {language}). }`,
          filter: `FILTER ( str(?lit) = "${htmlHighlightOpen}${searchTerm}${htmlHighlightClose}" ).`,
        },
        "full-ci": {
          score: 300,
          where: `{ (?label ?sc ?lit) text:query ("\\"${searchTerm}\\"" "${queryHighlight()}" {language}). }`,
          filter: `FILTER ( lcase(str(?lit)) = lcase("${htmlHighlightOpen}${searchTerm}${htmlHighlightClose}") &&
                     str(?lit) != "${htmlHighlightOpen}${searchTerm}${htmlHighlightClose}" ).`,
        },
        "startsWith-ci": {
          score: 200,
          where: `{ (?label ?sc ?lit) text:query ("${searchStarred()}" "${queryHighlight()}" {language}). }`,
          filter: `FILTER ( strstarts(lcase(?lit), lcase("${htmlHighlightOpen}${searchTerm}") ) &&
                     lcase(str(?lit)) != lcase("${htmlHighlightOpen}${searchTerm}${htmlHighlightClose}") ).`,
        },
        "subWord-ci": {
          score: 100,
          where: `{ (?label ?sc ?lit) text:query ("${searchStarred()}" "${queryHighlight()}" {language}). }`,
          filter: `FILTER ( !strstarts(lcase(?lit), lcase("${htmlHighlightOpen}${searchTerm}")) ).`,
        },
        "contains-ci": {
          score: 0,
          where: `{ (?label ?sc ?lit) text:query ("(${searchDoubleStarred()}) NOT (${searchStarred()})" "${queryHighlight()}" {language}). }`,
          filter: `FILTER ( !strstarts(lcase(?lit), lcase("${htmlHighlightOpen}${searchTerm}")) ).`,
        },
      },
      count: {
        all: {
          where: `{ SELECT ?label
              WHERE {
                ?label skosxl:literalForm ?lit.
              {languageFilter}
              }
          }`,
          filter: "",
        },
        "full-cs": {
          where: `{ (?label ?sc ?lit) text:query ("\\"${searchTerm}\\"" {language}). }`,
          filter: `FILTER ( str(?lit) = "${searchTerm}" ).`,
        },
        "full-ci": {
          where: `{ (?label ?sc ?lit) text:query ("\\"${searchTerm}\\"" {language}). }`,
          filter: `FILTER ( lcase(str(?lit)) = lcase("${searchTerm}") &&
                     str(?lit) != "${searchTerm}" ).`,
        },
        "startsWith-ci": {
          where: `{ (?label ?sc ?lit) text:query ("${searchStarred()}" {language}). }`,
          filter: `FILTER ( strstarts(lcase(?lit), lcase("${searchTerm}") ) &&
                     lcase(str(?lit)) != lcase("${searchTerm}") ).`,
        },
        "subWord-ci": {
          where: `{ (?label ?sc ?lit) text:query ("${searchStarred()}" {language}). }`,
          filter: `FILTER ( !strstarts(lcase(?lit), lcase("${searchTerm}")) ).`,
        },
        "contains-ci": {
          where: `{ (?label ?sc ?lit) text:query ("(${searchDoubleStarred()}) NOT (${searchStarred()})" {language}). }`,
          filter: `FILTER ( !strstarts(lcase(?lit), lcase("${searchTerm}")) ).`,
        },
      },
    };
    return content[queryType][matching];
  };

  const subqueryArray: string[] = [];
  matching.forEach((match) => {
    const whereArray: string[] = [];
    language.forEach((lang) => {
      if (match == "all") {
        if (!lang) {
          whereArray.push(
            subqueries(queryType, match).where.replace("{languageFilter}", "")
          );
        } else {
          whereArray.push(
            subqueries(queryType, match).where.replace(
              "{languageFilter}",
              `FILTER ( langmatches(lang(?lit), "${lang}") )`
            )
          );
        }
      } else {
        if (!lang) {
          whereArray.push(
            subqueries(queryType, match).where.replace("{language}", "")
          );
        } else {
          whereArray.push(
            subqueries(queryType, match).where.replace(
              "{language}",
              `"lang:${lang}"`
            )
          );
        }
      }
    });
    const where = whereArray.join("\n            UNION\n            ");

    const subqueryTemplate = (queryType: string) => {
      const subquery = {
        entries: `
        {
          SELECT ?label ?literal ?l (?sc + ${
            subqueries(queryType, match).score
          } as ?score)
                 ("${match}" as ?matching)
          WHERE {
            ${where}
            ${subqueries(queryType, match).filter}
            BIND ( lang(?lit) as ?l ).
            BIND ( str(?lit) as ?literal )
          }
          ORDER BY DESC(?score) lcase(?literal)
          LIMIT ${searchOptions.searchLimit}
        }`,
        count: `
        {
          SELECT ("${match}" as ?matching) (count(?label) as ?count)
          WHERE {
            ${where}
            ${subqueries(queryType, match).filter}
          }
        }`,
      };
      return subquery[queryType];
    };

    subqueryArray.push(subqueryTemplate(queryType));
  });
  const subquery = subqueryArray.join("\n        UNION\n");

  const queryEntries = () => `
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

  const queryCount = () => `
  PREFIX skosxl: <http://www.w3.org/2008/05/skos-xl#>
  PREFIX skosp: <http://www.data.ub.uib.no/ns/spraksamlingene/skos#>
  PREFIX text: <http://jena.apache.org/text#>

  SELECT ?matching ?count
  WHERE {
    ${graph}
    {
      {
        ${subquery}
      }
    }
  }`;

  switch (queryType) {
    case "entries":
      return queryEntries();
    case "count":
      return queryCount();
  }
}
