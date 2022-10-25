
export function generateConceptQuery(samling: string, begrep: string) {
  const query = `
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX xkos: <http://rdf-vocabulary.ddialliance.org/xkos#>
    PREFIX text: <http://jena.apache.org/text#>
    PREFIX skosxl: <http://www.w3.org/2008/05/skos-xl#>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX skosp: <http://www.data.ub.uib.no/ns/spraksamlingene/skos#>
    PREFIX skosno: <https://data.norge.no/vocabulary/skosno#>
    PREFIX base: <http://wiki.terminologi.no/index.php/Special:URIResolver/>
    CONSTRUCT  {
      base:${samling}-3A${begrep} ?p ?o.
      ?o ?p2 ?o2.
      ?o2 ?p3 ?o3.}
    WHERE {
      GRAPH ?GRAPH {
        {
          base:${samling}-3A${begrep} ?p ?o.
          OPTIONAL {?o ?p2 ?o2.
            OPTIONAL {?o2 ?p3 ?o3
              FILTER NOT EXISTS {
                ?o3 a skos:Concept
              }
              FILTER NOT EXISTS {
                ?o3 a skos:Collection
              }
            }
            FILTER NOT EXISTS {
              ?o a skos:Collection .
            }
            FILTER NOT EXISTS {
              ?o2 a skos:Collection
            }
          }
         }
      }}
    `;
  return query;
}
