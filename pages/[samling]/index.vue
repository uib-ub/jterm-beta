<template>
  <div>
    <ContentDoc>
      <template #not-found> {{ $t("samling.not-found") }} </template>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const samling = getSamlingFromParam();
const uri = `base:${samling}-3A${samling}`;
const samlingData = ref();
const displayData = computed(() => {
  return mapData(samlingData.value?.["@graph"]);
});
const descriptionData = computed(() => {
  try {
    return displayData.value[uri]?.["dcterms:description"]?.["@value"].split(
      "\n\n"
    );
  } catch (e) {
    return;
  }
});

function getSamlingFromParam() {
  const samling = route.params.samling;
  if (typeof samling === "string") {
    return samling;
  } else {
    return samling[0];
  }
}

function mapData(graph: []) {
  try {
    return Object.assign({}, ...graph.map((x) => ({ [x["@id"]]: x })));
  } catch (e) {}
  return {};
}

async function fetchData() {
  const data = await $fetch("/api/termjsonld", {
    method: "post",
    body: generateSamlingQuery(samling),
  });
  samlingData.value = data;
}

fetchData();
</script>
