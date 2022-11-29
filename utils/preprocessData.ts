import { SearchDataEntry } from "~~/composables/states";

/**
 * Returns object where keys are "@id"s from objects
 *
 * @param graph - List of objects to identity
 * @returns identified `graph`
 */
export function identifyData(graph: Array<any>) {
  try {
    return Object.assign({}, ...graph.map((x) => ({ [x["@id"]]: x })));
  } catch (e) {}
  return {};
}

/**
 * Get set of language codes in labels of concept
 *
 * @param data - Data that represents a concept with labels with language code
 * @returns Set of present language codes
 */
export function getConceptLanguages(data: any): string[] {
  try {
    const prefLabel = Object.keys(data?.prefLabel || []);
    const altLabel = Object.keys(data?.altLabel || []);
    const hiddenLabel = Object.keys(data?.hiddenLabel || []);
    return [...new Set([...prefLabel, ...altLabel, ...hiddenLabel])];
  } catch (e) {
    return [];
  }
}

/**
 * Returns dataset where objects identified by uri are transformed to make labels accessible by lc.
 *
 * @param data - Dataset that houses concept data
 * @param conceptUris - Key for object that represents concept
 * @param labeltypes - List of label types to identify with language code
 * @returns Dataset where labels with same languagecode are grouped in object with lc as key
 */
export function idLabelsWithLang(
  data: any,
  conceptUris: string[],
  labeltypes: string[]
): { [key: string]: string } {
  for (const uri of conceptUris) {
    for (const labeltype of labeltypes) {
      try {
        data[uri][labeltype] = updateLabel(data, uri, labeltype);
      } catch (e) {}
    }
  }
  return data;
}

/**
 * Returns new object with language as key for labels list.
 *
 * @param data - Dataset that represents concepts and labels
 * @param conceptUri - key for object that represents concept
 * @param labelType - label type to update
 * @returns object for labeltype with list for each language: e.g. {nb: [label1, label2]}
 */
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

/**
 * Get max length for object with list as value.
 *
 * @param data - Object to be evluated. e.g. {key: [1], key2: ["a", "n"]}
 */
export function getMaxNumberOfInstances(data: {
  [key: string]: any[];
}): number {
  try {
    const lengths = Object.keys(data).map(function (key) {
      return data[key].length;
    });
    // const lengths = values.map((lang) => lang.length);
    return Math.max(...lengths);
  } catch (e) {
    return 0;
  }
}

/* Search data preprocessing
 */

/**
 * Return preprocessed search result
 *
 * @param binding - Object that represents one match
 */
export function processBinding(binding: {
  [key: string]: any;
}): SearchDataEntry {
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
    score: binding.score.value,
    translate: binding?.translate?.value || "",
  };
}

export function sumAggregateData(
  obj: { [key: string]: { [key: string]: string } },
  subObj: { [key: string]: { [key: string]: string } }
) {
  const category = Object.keys(subObj)[0];
  if (Object.keys(obj).includes(category)) {
    const newData: { [key: string]: string } = JSON.parse(
      subObj[category].value
    );
    for (const entry of Object.entries(newData)) {
      if (Object.keys(obj[category]).includes(entry[0])) {
        obj[category][entry[0]] = obj[category][entry[0]] + entry[1];
      } else {
        obj[category][entry[0]] = entry[1];
        console.log(obj);
      }
    }
    return obj;
  } else {
    return {
      ...obj,
      ...{
        [category]: JSON.parse(Object.values(subObj)[0].value),
      },
    };
  }
}