export function identifyData(graph: Array<any>) {
  try {
    return Object.assign({}, ...graph.map((x) => ({ [x["@id"]]: x })));
  } catch (e) {}
  return {};
}

export function getConceptLanguages(data: any, uri: string) {
  try {
    const prefLabel = Object.keys(data[uri]?.prefLabel || []);
    const altLabel = Object.keys(data[uri]?.altLabel || []);
    const hiddenLabel = Object.keys(data[uri]?.hiddenLabel || []);
    return [...new Set([...prefLabel, ...altLabel, ...hiddenLabel])];
  } catch (e) {
    return [];
  }
}

export function idLabelsWithLang(
  data: any,
  conceptUri: string,
  labeltypes: string[]
) {
  for (const labeltype of labeltypes) {
    try {
      data[conceptUri][labeltype] = updateLabel(data, conceptUri, labeltype);
    } catch (e) {}
  }
  return data;
}

export function updateLabel(data: any, conceptUri: string, labelType: string) {
  const newLabels: { [key: string]: Array<string> } = {};
  const labels: Array<string> = data[conceptUri][labelType];
  for (const label of labels) {
    const language = data[label].literalForm["@language"];
    try {
      // key already exists
      newLabels[language].push(label);
    } catch (e) {
      // key doesn't exist
      newLabels[language] = [];
      newLabels[language].push(label);
    }
  }
  return newLabels;
}

export function getNumberOfInstances(data: any, uri: string, property: string) {
  try {
    const propertyDict = data[uri][property];
    const values = Object.keys(propertyDict).map(function (key) {
      return propertyDict[key];
    });
    const lengths = values.map((lang) => lang.length);
    return Math.max(...lengths);
  } catch (e) {
    return 0;
  }
}

export function processBindings(binding) {
  const link = binding.uri.value.split("/").at(-1).replace("-3A", "/");
  const predicate = binding.predicate.value.replace(
    "http://www.w3.org/2008/05/skos-xl#",
    ""
  );
  return {
    predicate: predicate,
    label: binding.literal.value,
    link: link,
    lang: binding.lang.value.split(","),
    samling: binding.samling.value,
    matching: binding.matching.value,
    score: binding.score.value
  };
}
