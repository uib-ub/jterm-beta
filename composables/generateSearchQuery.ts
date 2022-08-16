import sparqljs from 'sparqljs';

export function generateSearchQuery(searchterm: string) {
  const searchLanguage = useSearchLanguage()

  const { Parser, Generator } = sparqljs;
  const parser = new Parser();
  const generator = new Generator();


  const query = `
    PREFIX skosxl: <http://www.w3.org/2008/05/skos-xl#>
    PREFIX skosp: <http://www.data.ub.uib.no/ns/spraksamlingene/skos#>
    PREFIX text: <http://jena.apache.org/text#>
    SELECT distinct ?art ?tword ?samling
    WHERE
    {
      GRAPH <urn:x-arq:UnionGraph>
      {
        {
          SELECT  ?lab ?tword
          WHERE  { ?lab text:query "".}
          ORDER BY str(?tword) LIMIT 100
        }
        ?art ?p ?lab.
        ?art skosp:memberOf ?samling.
        ?lab skosxl:literalForm ?tword.
      }
    }`;
    
    const parsedQuery = parser.parse(query);
    parsedQuery.where[0].patterns[0].patterns[0].where[0].triples[0].object.value = searchterm + "*"
    parsedQuery.where[0].patterns[0].patterns[0].where[0].triples[0].object.language = searchLanguage.value
    const generatedQuery = generator.stringify(parsedQuery);
    return generatedQuery
}