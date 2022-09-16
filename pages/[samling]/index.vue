<template>
  <div>
    <h1 class="py-3">
      {{ displayData[uri]?.["rdfs:label"][0]["@value"] }}
    </h1>
    <div class="container p-0">
      <div class="row row-cols-1 row-cols-md-2">
        <!--Description-->
        <div class="col">
          <p v-for="p in descriptionData">
            {{ p }}
          </p>
        </div>
        <!--Table-->
        <div class="col">
          <table class="table table-sm table-hover table-borderless">
            <tbody>
              <!--Organisation-->
              <tr
                v-if="displayData?.[`${uri}-23org`]?.['rdfs:label']?.['@value']"
              >
                <th class="col-3" scope="row">
                  {{ $t("samling.organisation") }}
                </th>
                <td>
                  {{ displayData[`${uri}-23org`]["rdfs:label"]["@value"] }}
                </td>
              </tr>
              <!--Organisation number-->
              <tr v-if="displayData?.[`${uri}-23org`]?.['dcterms:identifier']">
                <th class="col" scope="row">
                  {{ $t("samling.orgnr") }}
                </th>
                <td>
                  {{ displayData[`${uri}-23org`]["dcterms:identifier"] }}
                </td>
              </tr>
              <!--Email-->
              <tr v-if="displayData?.[`${uri}-23contact`]?.['vcard:hasEmail']">
                <th class="col" scope="row">
                  {{ $t("samling.email") }}
                </th>
                <td>
                  <a
                    :href="displayData[`${uri}-23contact`]?.['vcard:hasEmail']['@id']"
                    >{{
                      displayData[`${uri}-23contact`]?.["vcard:hasEmail"][
                        "@id"
                      ].split(":")[1]
                    }}</a
                  >
                </td>
              </tr>
              <!--Telephone-->
              <tr
                v-if="displayData?.[`${uri}-23contact`]?.['vcard:hasTelephone']"
              >
                <th class="col" scope="row">
                  {{ $t("samling.telephone") }}
                </th>
                <td>
                  {{ displayData[`${uri}-23contact`]?.["vcard:hasTelephone"] }}
                </td>
              </tr>
              <!--Languages-->
              <tr v-if="displayData[uri]?.['dcterms:language']">
                <th class="col" scope="row">
                  {{ $t("global.language", 1) }}
                </th>
                <td>
                  {{
                    displayData[uri]["dcterms:language"]
                      .map((lang: string) => $t("global.lang." + lang))
                      .join(", ")
                  }}
                </td>
              </tr>
              <!--Starting languages-->
              <tr v-if="displayData[uri]?.['skosp:opprinneligSpraak']">
                <th class="col" scope="row">
                  {{ $t("samling.startLang") }}
                </th>
                <td>
                  {{
                    $t(
                      "global.lang." +
                        displayData[uri]?.["skosp:opprinneligSpraak"]
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
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
