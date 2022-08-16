export function generateConceptQuery(samling: string, begrep: string) {

  const query =
    `
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    SELECT ?p0 ?s0 ?p1 ?s1
    WHERE { GRAPH ?GRAPH {
    <http://wiki.terminologi.no/index.php/Special:URIResolver/${samling}-3A${begrep}> ?p0 ?s0.
    NOT EXISTS {?s0 a skos:Concept}.
    NOT EXISTS {?s0 a skos:Collection}.
    OPTIONAL {?s0 ?p1 ?s1. }
    }}`;


  console.log("Newquery: " + query)


  return query
}