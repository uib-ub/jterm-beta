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
    const hiddenLabel = Object.keys(data[uri]?.hiddenLabel || [])
    return [...new Set([...prefLabel, ...altLabel, ...hiddenLabel])];
  } catch (e) {
    return [];
  }
}