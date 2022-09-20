<template>
  <div>
    <h1 class="py-3">
      {{ displayData[uri]?.["rdfs:label"][0]["@value"] }}
    </h1>
    <div class="container p-0">
      <div class="row row-cols-1 row-cols-md-2">
        <!--Description-->
        <div class="col">
          <p
            v-for="p in uriData?.['dcterms:description']?.['@value'].split(
              '\n\n'
            )"
          >
            {{ p }}
          </p>
        </div>
        <!--Table-->
        <div class="col">
          <table class="table table-sm table-hover table-borderless">
            <tbody>
              <!--Organisation-->
              <DataRow
                v-if="orgData?.['rdfs:label']?.['@value']"
                :data="orgData['rdfs:label']['@value']"
                thClass="col-3"
                :label="$t('samling.organisation')"
              />
              <!--Organisation number-->
              <DataRow
                v-if="orgData?.['dcterms:identifier']"
                :data="orgData['dcterms:identifier']"
                thClass="col-3"
                :label="$t('samling.orgnr')"
              />

              <!--Email-->
              <DataRow
                v-if="contactData?.['vcard:hasEmail']?.['@id']"
                :data="contactData['vcard:hasEmail']['@id'].split(':')[1]"
                thClass="col-3"
                :label="$t('samling.email')"
                :to="contactData['vcard:hasEmail']['@id']"
              />
              <!--Telephone-->
              <DataRow
                v-if="contactData?.['vcard:hasTelephone']"
                :data="contactData?.['vcard:hasTelephone']"
                thClass="col-3"
                :label="$t('samling.telephone')"
              />
              <!--Languages-->
              <DataRow
                v-if="uriData?.['dcterms:language']"
                :data="uriData['dcterms:language'].map((lang: string) => $t('global.lang.' + lang)) .join(', ')"
                thClass="col-3"
                :label="$t('global.language', 1)"
              />
              <!--Starting languages-->
              <DataRow
                v-if="uriData?.['skosp:opprinneligSpraak']"
                :data="$t('global.lang.' + uriData['skosp:opprinneligSpraak'])"
                thClass="col-3"
                :label="$t('samling.startLang')"
              />
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
  return identifyData(samlingData.value?.["@graph"]);
});
const uriData = computed(() => {
  return displayData.value[uri];
});
const orgData = computed(() => {
  return displayData.value?.[`${uri}-23org`];
});
const contactData = computed(() => {
  return displayData.value?.[`${uri}-23contact`];
});

function getSamlingFromParam() {
  const samling = route.params.samling;
  if (typeof samling === "string") {
    return samling;
  } else {
    return samling[0];
  }
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
