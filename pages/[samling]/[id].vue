<template>
  <div class="container row px-0 py-3">
    <div
      v-if="searchDataFiltered.length > 0"
      class="d-md-none d-lg-block col-3"
    >
      <div class="container pb-3">
        <NuxtLink to="/search">{{ $t("id.tilbake") }}</NuxtLink>
      </div>
      <div style="height: calc(100vh * 0.9 - 220px); overflow: auto">
        <div class="list-group" ref="scrollComponent">
          <SearchResultEntryShort
            v-for="entry in searchDataFiltered"
            :entryData="entry"
          />
        </div>
      </div>
    </div>
    <div class="col px-3">
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
              <th scope="col" v-for="lang in displayInfo.displayLanguages">
                {{ $t("global.lang." + lang) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!--PrefLabel-->
            <tr v-for="(e, i) in displayInfo.prefLabelLength">
              <th scope="row">{{ $t("id.prefLabel") }}</th>
              <td v-for="lang in displayInfo.displayLanguages">
                {{
                  data[data[uri]?.prefLabel[lang]?.[i]]?.literalForm["@value"]
                }}
              </td>
              <!--Kontekst?-->
            </tr>
            <!--AltLabel-->
            <tr v-for="(e, i) in displayInfo.altLabelLength">
              <th scope="row">{{ $t("id.altLabel") }}</th>
              <td v-for="lang in displayInfo.displayLanguages">
                {{
                  data[data[uri]?.altLabel[lang]?.[i]]?.literalForm["@value"]
                }}
              </td>
            </tr>
            <!--HiddenLabel-->
            <tr v-for="(e, i) in displayInfo.hiddenLabelLength">
              <th scope="row">{{ $t("id.hiddenLabel") }}</th>
              <td v-for="lang in displayInfo.displayLanguages">
                {{
                  data[data[uri]?.hiddenLabel[lang]?.[i]]?.literalForm["@value"]
                }}
              </td>
            </tr>
            <!--Definisjon-->
          </tbody>
        </table>
      </div>

      <div v-for="lang in displayInfo.displayLanguages" v-else>
        <h2>{{ $t("global.lang." + lang) }}</h2>
        <table class="table table-sm table-hover table-borderless">
          <tbody>
            <!--Anbefalt term-->
            <DataRow
              v-for="label in data[uri]?.prefLabel?.[lang]"
              :data="data[label]?.literalForm['@value']"
              thClass="col-2"
              :label="$t('id.prefLabel')"
            />
            <!--AltLabel-->
            <DataRow
              v-for="label in data[uri]?.altLabel?.[lang]"
              :data="data[label]?.literalForm['@value']"
              thClass="col-2"
              :label="$t('id.altLabel')"
            />
            <!--HiddenLabel-->
            <DataRow
              v-for="label in data[uri]?.hiddenLabel?.[lang]"
              :data="data[label]?.literalForm['@value']"
              thClass="col-2"
              :label="$t('id.hiddenLabel')"
            />
          </tbody>
        </table>
      </div>

      <h2 v-if="data[uri]">{{ $t("id.general") }}</h2>
      <table class="table table-sm table-hover table-borderless">
        <tbody>
          <!--Samling-->
          <DataRow
            v-if="data[uri]?.memberOf"
            :samling="data[uri]?.memberOf.split('-3A')[0]"
            :data="samling"
            :nuxtlink="true"
            :to="`/${samling}`"
            :label="$t('id.collection')"
          />
          <!--Domene-->
          <DataRow
            v-if="data[uri]?.domene"
            :data="data[uri]?.domene"
            thClass="col-2"
            :label="$t('id.domain')"
          />
          <!--Bruksområde-->
          <DataRow
            v-if="data[uri]?.subject"
            :data="data[uri]?.subject.join(', ')"
            thClass="col-2"
            :label="$t('id.subject')"
          />
          <!--Modified-->
          <DataRow
            v-if="data[uri]?.modified"
            :data="data[uri]?.modified['@value']"
            thClass="col-2"
            :label="$t('id.modified')"
          />
          <!--Created-->
          <!--Note TODO after export fix-->
          <DataRow
            v-if="data[uri]?.scopeNote"
            :data="data[uri]?.scopeNote"
            thClass="col-2"
            :label="$t('id.note')"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const samling = route.params.samling;
const id = route.params.id;
const uri = `${samling}-3A${id}`;
const dataDisplayLanguages = useDataDisplayLanguages();
const conceptViewToggle = useConceptViewToggle();
const searchDataFiltered = useSearchDataFiltered();

const fetchedData = ref({});
const data = computed(() => {
  const identified = identifyData(fetchedData.value?.["@graph"]);
  const labeled = idLabelsWithLang(identified, uri, [
    "prefLabel",
    "altLabel",
    "hiddenLabel",
  ]);
  return labeled;
});
const displayInfo = computed(() => {
  const conceptLanguages = getConceptLanguages(data.value, uri);
  const displayLanguages = dataDisplayLanguages.value.filter((language) =>
    Array.from(conceptLanguages).includes(language)
  );
  const prefLabelLength = getNumberOfInstances(data.value, uri, "prefLabel");
  const altLabelLength = getNumberOfInstances(data.value, uri, "altLabel");
  const hiddenLabelLength = getNumberOfInstances(
    data.value,
    uri,
    "hiddenLabel"
  );
  return {
    conceptLanguages,
    displayLanguages,
    prefLabelLength,
    altLabelLength,
    hiddenLabelLength,
  };
});

async function fetchConceptData() {
  const fetched = await fetchData(
    genConceptQuery(samling, id),
    "application/ld+json"
  );
  const compacted = await compactData(fetched);
  fetchedData.value = compacted;
}

fetchConceptData();
</script>

<style></style>
