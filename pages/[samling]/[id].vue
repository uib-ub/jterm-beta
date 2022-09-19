<template>
  <div class="container px-2">
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="viewToggle"
        v-model="conceptViewToggle"
      />
      <label for="viewToggle">{{ $t("id.tableview") }}</label>
    </div>
    <h1>{{ data[uri]?.label }}</h1>

    <div v-if="conceptViewToggle">
      <h2>{{ $t("id.languagedata") }}</h2>
      <table class="table table-sm table-hover table-borderless">
        <!--Header-->
        <thead>
          <tr>
            <th class="col-2" scope="col"></th>
            <th scope="col" v-for="lang in displayLanguages">
              {{ $t("global.lang." + lang) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!--PrefLabel-->
          <tr v-for="(e, i) in prefLabelLength">
            <th scope="row">{{ $t("id.prefLabel") }}</th>
            <td v-for="lang in displayLanguages">
              {{ data[data[uri]?.prefLabel[lang]?.[i]]?.literalForm["@value"] }}
            </td>
            <!--Kontekst?-->
          </tr>
          <!--AltLabel-->
          <tr v-for="(e, i) in altLabelLength">
            <th scope="row">{{ $t("id.altLabel") }}</th>
            <td v-for="lang in displayLanguages">
              {{ data[data[uri]?.altLabel[lang]?.[i]]?.literalForm["@value"] }}
            </td>
          </tr>
          <!--HiddenLabel-->
          <tr v-for="(e, i) in hiddenLabelLength">
            <th scope="row">{{ $t("id.hiddenLabel") }}</th>
            <td v-for="lang in displayLanguages">
              {{
                data[data[uri]?.hiddenLabel[lang]?.[i]]?.literalForm["@value"]
              }}
            </td>
          </tr>
          <!--Definisjon-->
        </tbody>
      </table>
    </div>

    <div v-for="lang in displayLanguages" v-else>
      <h2>{{ $t("global.lang." + lang) }}</h2>
      <table class="table table-sm table-hover table-borderless">
        <tbody>
          <!--Anbefalt term-->
          <tr v-for="label in data[uri]?.prefLabel?.[lang]">
            <th class="col-2" scope="row">{{ $t("id.prefLabel") }}</th>
            <td>{{ data[label]?.literalForm["@value"] }}</td>
          </tr>
          <!--AltLabel-->
          <tr v-for="label in data[uri]?.altLabel?.[lang]">
            <th class="col-2" scope="row">{{ $t("id.altLabel") }}</th>
            <td>{{ data[label]?.literalForm["@value"] }}</td>
          </tr>
          <!--HiddenLabel-->
          <tr v-for="label in data[uri]?.hiddenLabel?.[lang]">
            <th class="col-2" scope="row">{{ $t("id.hiddenLabel") }}</th>
            <td>{{ data[label]?.literalForm["@value"] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>{{ $t("id.general") }}</h2>
    <table class="table table-sm table-hover table-borderless">
      <tbody>
        <!--Samling-->
        <tr v-if="data[uri]?.memberOf">
          <th class="col-2" scope="row">{{ $t("id.collection") }}</th>
          <td :samling="data[uri]?.memberOf.split('-3A')[0]">
            <NuxtLink :to="`/${samling}`">{{ samling }}</NuxtLink>
          </td>
        </tr>
        <!--Domene-->
        <tr v-if="data[uri]?.domene">
          <th class="col-2" scope="row">{{ $t("id.domain") }}</th>
          <td>{{ data[uri]?.domene }}</td>
        </tr>
        <!--Bruksområde-->
        <tr v-if="data[uri]?.subject">
          <th class="col-2" scope="row">{{ $t("id.subject") }}</th>
          <td>{{ data[uri]?.subject.join(", ") }}</td>
        </tr>
        <!--Modified-->
        <tr v-if="data[uri]?.modified">
          <th class="col-2" scope="row">{{ $t("id.modified") }}</th>
          <td>{{ data[uri]?.modified["@value"] }}</td>
        </tr>
        <!--Created-->
        <!--Note TODO after export fix-->
        <tr v-if="data[uri]?.scopeNote">
          <th class="col-2" scope="row">{{ $t("id.note") }}</th>
          <td>{{ data[uri]?.scopeNote }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { compactConceptData } from '~~/composables/compactData';


const route = useRoute();
const samling = route.params.samling;
const id = route.params.id;
const uri = `${samling}-3A${id}`;
const dataDisplayLanguages = useDataDisplayLanguages();
const conceptLanguages = new Set([]);
const displayLanguages = ref([]);
const conceptViewToggle = useConceptViewToggle();
const data = ref({});
const prefLabelLength = ref(0);
const altLabelLength = ref(0);
const hiddenLabelLength = ref(0);

async function fetchData() {
  const data = await $fetch("/api/termjsonld", {
    method: "post",
    body: generateConceptQuery(samling, id),
  });
  return data;
}

function updateLabels(data, conceptUri, labelType) {
  const newLabels = {};
  const labels = data[conceptUri][labelType];
  for (const label of labels) {
    const language = data[label].literalForm["@language"];
    conceptLanguages.add(language);
    try {
      newLabels[language].push(label);
    } catch (e) {
      newLabels[language] = [];
      newLabels[language].push(label);
    }
  }
  return newLabels;
}

function mapData(graph) {
  const data = Object.assign({}, ...graph.map((x) => ({ [x["@id"]]: x })));
  for (const labeltype of ["prefLabel", "altLabel", "hiddenLabel"]) {
    try {
      data[uri][labeltype] = updateLabels(data, uri, labeltype);
    } catch (e) {
      console.log("No label of type '" + labeltype + " present.");
    }
  }
  return data;
}

function getNumberOfInstances(data, property) {
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

async function getData() {
  const fetched = await fetchData();
  const compacted = await compactData(fetched);
  const mapped = await mapData(compacted["@graph"]);
  displayLanguages.value = dataDisplayLanguages.value.filter((language) =>
    Array.from(conceptLanguages).includes(language)
  );
  prefLabelLength.value = getNumberOfInstances(mapped, "prefLabel");
  altLabelLength.value = getNumberOfInstances(mapped, "altLabel");
  hiddenLabelLength.value = getNumberOfInstances(mapped, "hiddenLabel");
  data.value = mapped;
}

getData();
</script>

<style></style>
