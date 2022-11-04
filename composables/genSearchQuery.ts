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
        .replace(/\-|\(|\)|\<|\>|\[|\]|\/|,\s*$/g, " ")
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
      return this.termHL().slice(0, -7);
    },
    queryHighlight: () =>
      `highlight:s:${highlight.open} | e:${highlight.close}`,
  };
}

export function getGraphData(graphKey: string | string[]) {
  const uniongraph = "GRAPH <urn:x-arq:UnionGraph>";
  if (Array.isArray(graphKey)) {
    if (graphKey.length > 0) {
      const bases = graphKey
        .map(
          (key) =>
            `(<http://spraksamlingane.no/terminlogi/named/${samlingMapping[key]}>)`
        )
        .join("");
      return `VALUES (?G) {${bases}} GRAPH ?G`;
    } else {
      return uniongraph;
    }
  } else if (graphKey != "all") {
    return `VALUES (?G) {(<http://spraksamlingane.no/terminlogi/named/${samlingMapping[graphKey]}>)} GRAPH ?G`;
  } else {
    if (graphKey) {
      return uniongraph;
    } else {
      return uniongraph;
    }
  } else if (graphKey != "all") {
    return `(<http://spraksamlingane.no/terminlogi/named/${samlingMapping[graphKey]}>)`;
  } else {
    return uniongraph;
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

export function genSearchQuery(
  searchOptions: SearchOptions,
  queryType: string,
  matching: string[]
) {
  const termData = getTermData(searchOptions.searchTerm, htmlHighlight);
  const graph = getGraphData(searchOptions.searchBase);
  const language = getLanguageData(searchOptions.searchLanguage);

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
          where: `{ (?label ?sc ?lit) text:query ("\\"${termData.sanitized()}\\"" "${termData.queryHighlight()}" {language}). }`,
          filter: `FILTER ( str(?lit) = "${termData.termHL()}" ).`,
          //filter: ""
        },
        "full-ci": {
          score: 300,
          where: `{ (?label ?sc ?lit) text:query ("\\"${termData.sanitized()}\\"" "${termData.queryHighlight()}" {language}). }`,
          filter: `FILTER ( lcase(str(?lit)) = lcase("${termData.termHL()}") &&
                     str(?lit) != "${termData.termHL()}" ).`,
        },
        "startsWith-ci": {
          score: 200,
          where: `{ (?label ?sc ?lit) text:query ("${termData.starred()}" "${termData.queryHighlight()}" {language}). }`,
          filter: `FILTER ( strstarts(lcase(?lit), lcase("${termData.termHLstart()}") ) &&
                     lcase(str(?lit)) != lcase("${termData.termHL()}") ).`,
          //filter: ""
        },
        "subWord-ci": {
          score: 100,
          where: `{ (?label ?sc ?lit) text:query ("${termData.starred()}" "${termData.queryHighlight()}" {language}). }`,
          filter: `FILTER ( !strstarts(lcase(?lit), lcase("${termData.termHLstart()}")) ).`,
        },
        "contains-ci": {
          score: 0,
          where: `{ (?label ?sc ?lit) text:query ("(${termData.doubleStarred()}) NOT (${termData.starred()})" "${termData.queryHighlight()}" {language}). }`,
          filter: `FILTER ( !strstarts(lcase(?lit), lcase("${termData.termHLstart()}")) ).`,
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
          where: `{ (?label ?sc ?lit) text:query ("\\"${termData.term}\\"" {language}). }`,
          filter: `FILTER ( str(?lit) = "${termData.term}" ).`,
        },
        "full-ci": {
          where: `{ (?label ?sc ?lit) text:query ("\\"${termData.term}\\"" {language}). }`,
          filter: `FILTER ( lcase(str(?lit)) = lcase("${termData.term}") &&
                     str(?lit) != "${termData.term}" ).`,
        },
        "startsWith-ci": {
          where: `{ (?label ?sc ?lit) text:query ("${termData.starred()}" {language}). }`,
          filter: `FILTER ( strstarts(lcase(?lit), lcase("${termData.term}") ) &&
                     lcase(str(?lit)) != lcase("${termData.term}") ).`,
        },
        "subWord-ci": {
          where: `{ (?label ?sc ?lit) text:query ("${termData.starred()}" {language}). }`,
          filter: `FILTER ( !strstarts(lcase(?lit), lcase("${termData.term}")) ).`,
        },
        "contains-ci": {
          where: `{ (?label ?sc ?lit) text:query ("(${termData.doubleStarred()}) NOT (${termData.starred()})" {language}). }`,
          filter: `FILTER ( !strstarts(lcase(?lit), lcase("${termData.term}")) ).`,
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
    default:
      throw new Error("queryType not matched");
  }
}
