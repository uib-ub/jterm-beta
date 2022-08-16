<template>
  <div>
    <h2>{{ conceptData?.felles?.label }}</h2>
    <div class="container py-3" v-for="(value, prop) in conceptData">
      <div class="row">
        <div class="col">
          <h4>{{ languageData[prop] || prop }}</h4>
        </div>
        <div class="row" v-for="(value1, prop1) in value">
          <div class="col-2">{{ prop1 }}</div>
          <div class="col-7">{{ value1 }}</div>

        </div>
      </div>
    </div>
    <ul>
      <li v-for="item in mydata">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const route = useRoute();
const samling = route.params.samling;
const id = route.params.id;
const conceptData = ref({});
const mydata = ref({});
const dataDisplayLanguages = useDataDisplayLanguages();

const languageData = {
  felles: "Felles",
  nb: "Bokmål",
  nn: "Nynorsk",
  en: "Engelsk",
  la: "Latin"
}

function set(pList, value, data) {
  var schema = data;  // a moving reference to internal objects within obj
  var len = pList.length;
  for (var i = 0; i < len - 1; i++) {
    var elem = pList[i];
    if (!schema[elem]) schema[elem] = {}
    schema = schema[elem];
  }
  schema[pList[len - 1]] = value;
}

function mapConceptData(binding, conceptData) {
  if ("p1" in binding) {
    const mappingTableNested = {
      "http://www.w3.org/2008/05/skos-xl#prefLabel": { "http://www.w3.org/2008/05/skos-xl#literalForm": [binding.s1["xml:lang"], "anbefalt term"] },
      "http://www.w3.org/2008/05/skos-xl#altLabel": { "http://www.w3.org/2008/05/skos-xl#literalForm": [binding.s1["xml:lang"], "synonym"] }

    }
    try {
      const path = mappingTableNested[binding.p0.value][binding.p1.value];
      if (dataDisplayLanguages.value.includes(path[0])) {
        set(path, binding.s1.value, conceptData)
      }

    } catch (e) {
    }

  } else {
    const mappingTableFlat = {
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": ["felles", "type"],
      "http://www.w3.org/2000/01/rdf-schema#label": ["felles", "label"],
      "http://purl.org/dc/terms/modified": ["felles", "modified"],
      "http://purl.org/dc/terms/subject": ["felles", "subject"],
    }
    try {
      const path = mappingTableFlat[binding.p0.value];
      set(path, binding.s0.value, conceptData)
    } catch (e) {
    }
  }
}

async function fetchData() {
  const data = await $fetch(
    "/api/prod",
    {
      method: "post",
      body: generateConceptQuery(samling, id),
    }
  )
  mydata.value = data.results.bindings
  const tempData = { "felles": { "samling": samling } };
  const bindings = await data.results.bindings
  bindings.forEach(binding => mapConceptData(binding, tempData))
  conceptData.value = tempData
}

fetchData()

</script>

<style>
.center {
  text-align: left;
}
</style>
