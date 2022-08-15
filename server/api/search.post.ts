import sparqljs from 'sparqljs';

export default defineEventHandler(async (event) => {
  const { Parser, Generator } = sparqljs;
  const parser = new Parser();
  const generator = new Generator();

  const body = await useBody(event)

  const url = "https://sparql.terminologi.no/termwiki_prod/query"

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
  }
  `;

  const parsedQuery = parser.parse(query);
  parsedQuery.where[0].patterns[0].patterns[0].where[0].triples[0].object.value = body.searchterm + "*"
  parsedQuery.where[0].patterns[0].patterns[0].where[0].triples[0].object.language = body.searchLanguage
  console.log(JSON.stringify(parsedQuery))
  const generatedQuery = generator.stringify(parsedQuery);


  console.log("\ngeneratedQuery:\n" + generatedQuery)
  const response = await fetch(url,
    {
      method: 'POST',
      body: generatedQuery,
      headers: {
        'Content-type': 'application/sparql-query',
        'Referer': 'https://term.uib.no/'
      },
    });
  const respJson = response.json();
  return respJson;

})
