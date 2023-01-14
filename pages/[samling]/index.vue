<template>
  <div>
    <Head>
      <Title>{{ uriData?.label[0]["@value"] || uriData?.label[0]}} | Termportalen</Title>
    </Head>
    <h1 class="py-3 text-2xl">
      {{ uriData?.label[0]["@value"] || uriData?.label[0] }}
    </h1>
    <div class="flex flex-row">
      <!--Description-->
      <div class="basis-3/5 pr-4">
        <p v-for="p in uriData?.description?.['@value'].split('\n\n')" :key="p">
          {{ p }}
        </p>
      </div>
      <!--Table-->
      <div class="">
        <table class="">
          <tbody>
            <!--Organisation-->
            <DataRow
              v-if="orgData?.label?.['@value']"
              :data="orgData.label['@value']"
              :label="$t('samling.organisation')"
            />
            <!--Organisation number-->
            <DataRow
              v-if="orgData?.identifier"
              :data="orgData.identifier"
              :label="$t('samling.orgnr')"
            />

            <!--Email-->
            <DataRow
              v-if="contactData?.hasEmail"
              :data="contactData.hasEmail.split(':')[1]"
              :label="$t('samling.email')"
              :to="contactData.hasEmail"
            />
            <!--Telephone-->
            <DataRow
              v-if="contactData?.hasTelephone"
              :data="contactData?.hasTelephone"
              :label="$t('samling.telephone')"
            />
            <!--Languages-->
            <DataRow
              v-if="uriData?.language"
              :data="intersectUnique(languageOrder[$i18n.locale as keyof typeof languageOrder], uriData.language).map((lang: string) => $t('global.lang.' + lang)) .join(', ')"

              :label="$t('global.language', 1)"
            />
            <!--Starting languages-->
            <DataRow
              v-if="uriData?.opprinneligSpraak"
              :data="$t('global.lang.' + uriData.opprinneligSpraak)"
              :label="$t('samling.startLang')"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const samling = getSamlingFromParam();
const uri = `${samling}-3A${samling}`;
const samlingData = ref();
const displayData = computed(() => {
  return identifyData(samlingData.value?.["@graph"]);
});
const uriData = computed(() => {
  return displayData.value?.[uri];
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

async function fetchSamlingData() {
  const data = await fetchData(genSamlingQuery(samling), "application/ld+json");
  samlingData.value = await compactData(data);
}
fetchSamlingData();
</script>
