import jsonld, { ContextDefinition } from "jsonld";

const context: ContextDefinition = {
  "@base": "http://wiki.terminologi.no/index.php/Special:URIResolver/",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  skos: "http://www.w3.org/2004/02/skos/core#",
  xkos: "http://rdf-vocabulary.ddialliance.org/xkos#",
  skosxl: "http://www.w3.org/2008/05/skos-xl#",
  skosno: "https://data.norge.no/vocabulary/skosno#",
  skosp: "http://www.data.ub.uib.no/ns/spraksamlingene/skos#",
  dcterms: "http://purl.org/dc/terms/",
  xsd: "http://www.w3.org/2001/XMLSchema#",
  literalForm: "skosxl:literalForm",
  label: "rdfs:label",
  domene: "skosp:domene",
  modified: "dcterms:modified",
  scopeNote: "skos:scopeNote", // TODO

  semanticRelation: {
    "@id": "skos:semanticRelation",
    "@type": "@id",
    "@container": "@set",
  },
  subject: {
    "@id": "dcterms:subject",
    "@type": "@id",
    "@container": "@set",
  },
  memberOf: {
    "@id": "skosp:memberOf",
    "@type": "@id",
  },
  related: {
    "@id": "skos:related",
    "@type": "@id",
    "@container": "@set",
  },
  prefLabel: {
    "@id": "skosxl:prefLabel",
    "@type": "@id",
  },
  altLabel: {
    "@id": "skosxl:altLabel",
    "@type": "@id",
    "@container": "@set",
  },
  hiddenLabel: {
    "@id": "skosxl:hiddenLabel",
    "@type": "@id",
    "@container": "@set",
  },
  "dcterms:source": {
    "@id": "dcterms:source",
    "@type": "@id",
  },
};

export async function compactData(data: any) {
  try {
    return await jsonld.compact(data, context);
  } catch (e) {
    console.log(e);
  }
}
