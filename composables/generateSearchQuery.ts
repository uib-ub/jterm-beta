import sparqljs from "sparqljs";

export function generateSearchQuery(searchterm: string) {
  const searchLanguage = useSearchLanguage();

  const { Parser, Generator } = sparqljs;
  const parser = new Parser({
    prefixes: {
      skosxl: "http://www.w3.org/2008/05/skos-xl#",
      skosp: "http://www.data.ub.uib.no/ns/spraksamlingene/skos#",
      text: "http://jena.apache.org/text#",
    },
  });
  const generator = new Generator();

  const query = `
    SELECT distinct ?uri ?predicate ?term ?samling
    WHERE {
      GRAPH <urn:x-arq:UnionGraph> {
        {
          SELECT  ?label ?term
          WHERE  { ?label text:query "". }
          ORDER BY str(?term) LIMIT 100
        }
        ?uri ?predicate ?label;
          skosp:memberOf ?samling.
        ?label skosxl:literalForm ?term.
      }
    }`;

  const parsedQuery = parser.parse(query);
  parsedQuery.where[0].patterns[0].patterns[0].where[0].triples[0].object.value =
    searchterm + "*";
  parsedQuery.where[0].patterns[0].patterns[0].where[0].triples[0].object.language =
    searchLanguage.value;
  const generatedQuery = generator.stringify(parsedQuery);
  return generatedQuery;
}
