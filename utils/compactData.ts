import pkg from 'jsonld'

const { compact } = pkg;

const context = function () {
  const runtimeConfig = useRuntimeConfig();
  return {
    "@base": `${runtimeConfig.public.base}`,
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    skos: "http://www.w3.org/2004/02/skos/core#",
    xkos: "http://rdf-vocabulary.ddialliance.org/xkos#",
    skosxl: "http://www.w3.org/2008/05/skos-xl#",
    skosno: "https://data.norge.no/vocabulary/skosno#",
    skosp: "http://www.data.ub.uib.no/ns/spraksamlingene/skos#",
    dcterms: "http://purl.org/dc/terms/",
    xsd: "http://www.w3.org/2001/XMLSchema#",
    vcard: "http://www.w3.org/2006/vcard/ns#",
    literalForm: "skosxl:literalForm",
    label: "rdfs:label",
    domene: "skosp:domene",
    modified: "dcterms:modified",
    identifier: "dcterms:identifier",
    description: "dcterms:description",
    language: "dcterms:language",
    scopeNote: "skos:scopeNote", // TODO
    opprinneligSpraak: "skosp:opprinneligSpraak",
    hasTelephone: "vcard:hasTelephone",
    hasEmail: { "@id": "vcard:hasEmail", "@type": "@id" },

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
    publisher: {
      "@id": "dcterms:publisher",
      "@type": "@id",
    },
    source: {
      "@id": "dcterms:source",
      "@type": "@id",
    },
  };
};

export async function compactData(data: any) {
  try {
    return await compact(data, context());
  } catch {}
}
