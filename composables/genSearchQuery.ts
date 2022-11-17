import { SearchOptions } from "./states";

const htmlHighlight = {
  open: "<span class='searchHighlight'>",
  close: "</span>",
};

const samlingMapping = {
  MRT: 3000,
  MRT2: 3002,
  UHR: 3004,
  ARTSDB: 3006,
  EVERTEBRATER: 3008,
  NHH: 3010,
  NOJU: 3012,
  NOT: 3014,
  RTT: 3016,
  SDIR: 3018,
  TOLKING: 3022,
  ROMFYS: 3024,
  TUNDUIA: 3900,
  KLIMA: 3802,
  ASTRONOMI: 3804,
  BIOLOGI: 3806,
  LINGVISTIKK: 3808,
  CMBIOLOGI: 3810,
  KJEMI: 3812,
};

export function getTermData(
  term: string,
  highlight: { [key: string]: string }
) {
  return {
    term: term,
    sanitized: () =>
      term
        .replace(/\-|\(|\)|\<|\>|\[|\]|\/|,\s*$|\*|\~|\_/g, " ")
        .replace(/\s\s+/g, " ")
        .trim(),
    starred: function () {
      return this.sanitized()
        .split(/, | /)
        .map((t: string) => t + "*")
        .join(" AND ");
    },
    doubleStarred: function () {
      return this.sanitized()
        .split(/, | /)
        .map((t: string) => "*" + t + "*")
        .join(" AND ");
    },
    termHL: () =>
      term.replace(/((?!, )[\p{Letter}\p{Mark}\d,])+/giu, function (x) {
        return highlight.open + x + highlight.close;
      }),
    termHLstart: function () {
      return this.termHL().slice(0, -highlight.close.length);
    },
    termHLend: function () {
      return this.termHL().slice(highlight.open.length);
    },
    queryHighlight: () =>
      `highlight:s:${highlight.open} | e:${highlight.close}`,
  };
}

export function getGraphData(graphKey: string | string[]) {
  const uniongraph = "<urn:x-arq:UnionGraph>";
  if (Array.isArray(graphKey)) {
    if (graphKey.length > 0) {
      const bases = graphKey
        .map(
          (key) =>
            `FROM NAMED <http://spraksamlingane.no/terminlogi/named/${samlingMapping[key]}>`
        )
        .join("\n");
      return [bases, "?G"];
    } else {
      return ["", uniongraph];
    }
  } else if (graphKey != "all") {
    return ["", `<http://spraksamlingane.no/terminlogi/named/${samlingMapping[graphKey]}>`];
  } else {
    if (graphKey) {
      return ["", uniongraph];
    } else {
      return ["", uniongraph];
    }
  }
}

export function getLanguageData(language: string | string[]) {
  if (Array.isArray(language)) {
    return language;
  } else {
    if (language != "all") {
      return [language];
    } else {
      return [""];
    }
  }
}

function getLanguageWhere(
  subqueries,
  queryTypeIn: string,
  match: string,
  lang: string
) {
  let queryType = queryTypeIn;
  if (queryType == "aggregate") {
    queryType = "count";
  }

  if (match == "all") {
    if (!lang) {
      return subqueries(queryType, match).where.replace("{languageFilter}", "");
    } else {
      return subqueries(queryType, match).where.replace(
        "{languageFilter}",
        `FILTER ( langmatches(lang(?lit), "${lang}") )`
      );
    }
  } else {
    if (!lang) {
      return subqueries(queryType, match).where.replace("{language}", "");
    } else {
      return subqueries(queryType, match).where.replace(
        "{language}",
        `"lang:${lang}"`
      );
    }
  }
}

export function genSearchQuery(
  searchOptions: SearchOptions,
  queryType: string,
  matching: string[]
) {
  const termData = getTermData(searchOptions.searchTerm, htmlHighlight);
  const graph = getGraphData(searchOptions.searchBase);
  const language = getLanguageData(searchOptions.searchLanguage);
  const aggregateCategories = ["?lang", "?samling", "?predicate", "?matching"];

  const subqueries = (
    queryType: string,
    subEntry: string,
    aggregateMatch?: string
  ) => {
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
          score: 500,
          where: `{ (?label ?sc ?lit) text:query ("\\"${termData.sanitized()}\\"" "${termData.queryHighlight()}" {language}). }`,
          filter: `FILTER ( str(?lit) = "${termData.termHL()}" ).`,
          //filter: ""
        },
        "full-ci": {
          score: 400,
          where: `{ (?label ?sc ?lit) text:query ("\\"${termData.sanitized()}\\"" "${termData.queryHighlight()}" {language}). }`,
          filter: `FILTER ( lcase(str(?lit)) = lcase("${termData.termHL()}") &&
                     str(?lit) != "${termData.termHL()}" ).`,
        },
        "startsWith-ci": {
          score: 300,
          where: `{ (?label ?sc ?lit) text:query ("${termData.starred()}" "${termData.queryHighlight()}" {language}). }`,
          filter: `FILTER ( strStarts(lcase(?lit), lcase("${termData.termHLstart()}") ) &&
                     lcase(str(?lit)) != lcase("${termData.termHL()}") ).`,
          //filter: ""
        },
        "endsWith-ci": {
          score: 200,
          where: `{ (?label ?sc ?lit) text:query ("${termData.doubleStarred()}" "${termData.queryHighlight()}" {language}). }`,
          filter: `FILTER ( strEnds(lcase(?lit), lcase("${termData.termHLend()}") ) &&
                     lcase(str(?lit)) != lcase("${termData.termHL()}") ).`,
        },
        "subWord-ci": {
          score: 100,
          where: `{ (?label ?sc ?lit) text:query ("${termData.starred()}" "${termData.queryHighlight()}" {language}). }`,
          filter: `FILTER ( !strStarts(lcase(?lit), lcase("${termData.termHLstart()}")) &&
                     !strEnds(lcase(?lit), lcase("${termData.termHL()}")) ).`,
        },
        "contains-ci": {
          score: 0,
          where: `{ (?label ?sc ?lit) text:query ("(${termData.doubleStarred()}) NOT (${termData.starred()})" "${termData.queryHighlight()}" {language}). }`,
          filter: `FILTER ( !strEnds(lcase(?lit), lcase("${termData.termHLend()}")) ).`,
        },
      },
      count: {
        all: {
          where: `{ SELECT ?label ?lit
              WHERE {
                ?label skosxl:literalForm ?lit.
              {languageFilter}
              }
          }`,
          filter: "",
        },
        allPatterns: {
          where: `{ (?label ?sc ?lit) text:query ("${termData.doubleStarred()}" {language}).}`,
          filter: "",
        },
        "full-cs": {
          where: `{ (?label ?sc ?lit) text:query ("\\"${termData.sanitized()}\\"" {language}). }`,
          filter: `FILTER ( str(?lit) = "${termData.term}" ).`,
        },
        "full-ci": {
          where: `{ (?label ?sc ?lit) text:query ("\\"${termData.sanitized()}\\"" {language}). }`,
          filter: `FILTER ( lcase(str(?lit)) = lcase("${termData.term}") &&
                     str(?lit) != "${termData.term}" ).`,
        },
        "startsWith-ci": {
          where: `{ (?label ?sc ?lit) text:query ("${termData.starred()}" {language}). }`,
          filter: `FILTER ( strStarts(lcase(?lit), lcase("${termData.term}") ) &&
                     lcase(str(?lit)) != lcase("${termData.term}") ).`,
        },
        "endsWith-ci": {
          where: `{ (?label ?sc ?lit) text:query ("${termData.doubleStarred()}" {language}). }`,
          filter: `FILTER ( strEnds(lcase(?lit), lcase("${termData.term}") ) &&
                     lcase(str(?lit)) != lcase("${termData.term}") ).`,
        },
        "subWord-ci": {
          where: `{ (?label ?sc ?lit) text:query ("${termData.starred()}" {language}). }`,
          filter: `FILTER ( !strStarts(lcase(?lit), lcase("${termData.term}")) &&
                     !strEnds(lcase(?lit), lcase("${termData.term}")) ).`,
        },
        "contains-ci": {
          where: `{ (?label ?sc ?lit) text:query ("(${termData.doubleStarred()}) NOT (${termData.starred()})" {language}). }`,
          filter: `FILTER ( !strStarts(lcase(?lit), lcase("${termData.term}")) &&
                     !strEnds(lcase(?lit), lcase("${termData.term}")) ).`,
        },
      },
      aggregate: {
        lang: `BIND ( lang(?lit) as ?prop ).`,
        samling: `?uri ?predicate ?label;
                    skosp:memberOf ?s.
                  BIND (replace(str(?s), "http://.*wiki.terminologi.no/index.php/Special:URIResolver/.*-3A", "") as ?prop)`,
        predicate: `?uri ?p ?label;
               BIND (replace(str(?p), "http://www.w3.org/2008/05/skos-xl#", "") as ?prop)`,
        matching: `BIND ("${aggregateMatch}" as ?prop)`,
      },
    };
    return content[queryType][subEntry];
  };

  const subqueryTemplate = (
    subqueries,
    category: string,
    queryType: string,
    match: string,
    where: string
  ) => {
    const subquery = {
      entries: `
      {
        SELECT ?label ?literal ?l (?sc + ${
          subqueries(queryType, match)?.score
        } as ?score)
               ("${match}" as ?matching)
        WHERE {
          ${where}
          ${subqueries(queryType, match)?.filter}
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
          ${subqueries(queryType, match)?.filter}
        }
      }`,
      aggregate: `
              {
                SELECT ?prop {
                  ${where}
                  ${subqueries("count", match)?.filter}
                  ${subqueries(queryType, category, match)}
                }
              }`,
    };

    if (queryType == "count" && matching.length == 1) {
      return subquery[queryType] + "\n        UNION {}";
    } else {
      return subquery[queryType];
    }
  };

  const categoryTemplate = (category: string, subquery: string) => {
    return `
      {
        SELECT (concat("{", group_concat(?propCount; SEPARATOR=", "), "}") as ${category})
        WHERE {
          {
            SELECT ?prop (count(?prop) as ?pCount)
            WHERE {
            ${subquery}
            }
            GROUP BY ?prop
          }
        BIND (concat ('"', ?prop, '"', ': ', str(?pCount)) as ?propCount)
        }
      }`;
  };

  const categoriesArray: string[] = [];
  for (const category of aggregateCategories) {
    const subqueryArray: string[] = [];
    for (const match of matching) {
      const whereArray: string[] = [];
      if (queryType == "aggregate" && matching.length == 7) {
        language.forEach((lang) => {
          whereArray.push(
            getLanguageWhere(subqueries, queryType, "allPatterns", lang)
          );
        });
        const where = whereArray.join("\n            UNION\n            ");

        subqueryArray.push(
          subqueryTemplate(
            subqueries,
            category.replace("?", ""),
            queryType,
            "allPatterns",
            where
          )
        );
        break;
      } else {
        language.forEach((lang) => {
          whereArray.push(getLanguageWhere(subqueries, queryType, match, lang));
        });
        const where = whereArray.join("\n            UNION\n            ");

        subqueryArray.push(
          subqueryTemplate(
            subqueries,
            category.replace("?", ""),
            queryType,
            match,
            where
          )
        );
      }
    }
    const subquery = subqueryArray.join("\n        UNION");

    if (queryType == "aggregate") {
      categoriesArray.push(categoryTemplate(category, subquery));
    } else {
      categoriesArray.push(subquery);
      break;
    }
  }
  const outerSubquery = categoriesArray.join("\n      UNION");

  const queryEntries = () => `
  PREFIX skosxl: <http://www.w3.org/2008/05/skos-xl#>
  PREFIX skosp: <http://www.data.ub.uib.no/ns/spraksamlingene/skos#>
  PREFIX text: <http://jena.apache.org/text#>

  SELECT DISTINCT ?uri ?predicate ?literal ?samling ?score
         (group_concat( ?l; separator="," ) as ?lang)
         ?matching
  ${graph[0]}
  WHERE {
    GRAPH ${graph[1]} {
      { ${outerSubquery}
      }
      ?uri ?predicate ?label;
        skosp:memberOf ?s.
        BIND ( replace(str(?s), "http://.*wiki.terminologi.no/index.php/Special:URIResolver/.*-3A", "") as ?samling)
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
  ${graph[0]}
  WHERE {
    GRAPH ${graph[1]} {
      { ${outerSubquery}
      }
    }
  }`;

  const queryAggregate = () => `

PREFIX skosxl: <http://www.w3.org/2008/05/skos-xl#>
PREFIX skosp: <http://www.data.ub.uib.no/ns/spraksamlingene/skos#>
PREFIX text: <http://jena.apache.org/text#>

SELECT ${aggregateCategories.join(" ")}
${graph[0]}
WHERE {
  GRAPH ${graph[1]} {
    { ${outerSubquery}
    }
  }
}
  `;

  switch (queryType) {
    case "entries":
      return queryEntries();
    case "count":
      return queryCount();
    case "aggregate":
      return queryAggregate();
    default:
      throw new Error("queryType not matched");
  }
}
