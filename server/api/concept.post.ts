export default defineEventHandler(async (event) => {

  const body = await useBody(event)
  const url = "https://sparql.terminologi.no/termwiki_prod/query"

  const query =
    `
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    SELECT ?p0 ?s0 ?p1 ?s1
    WHERE { GRAPH ?GRAPH {
    <http://wiki.terminologi.no/index.php/Special:URIResolver/{{art}}> ?p0 ?s0.
    NOT EXISTS {?s0 a skos:Concept}.
    NOT EXISTS {?s0 a skos:Collection}.
    OPTIONAL {?s0 ?p1 ?s1. }
    }}
    `;

  const article_query = body.samling + "-3A" + body.art
  const newquery = query.replace('{{art}}', article_query)
  console.log("Newquery: " + newquery)

  try {
    const response = await fetch(url,
      {
        method: 'POST',
        body: newquery,
        headers: {
          'Content-type': 'application/sparql-query',
          'Referer': 'https://term.uib.no/'
        },
      });
      if (response.ok)
      {return await response.json()}
      else
      {alert(response.status)}
  }
  catch (e) {
    alert(e.name)
  }
})

