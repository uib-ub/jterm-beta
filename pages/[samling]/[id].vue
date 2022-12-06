<template>
  <div class="container row px-0 py-3">
    <h1 class="visually-hidden">{{$t("id.topheading")}}</h1>
    <div v-if="searchData.length > 0" class="d-md-none d-lg-block col-3">
      <div class="container p-0">
        <div class="container pt-2 pb-2 px-2">
          <NuxtLink to="/search">{{ $t("id.tilbake") }}</NuxtLink>
        </div>

        <h2 class="px-1">{{ $t("searchFilter.results-heading") }}</h2>
      </div>
      <div style="height: calc(100vh * 0.9 - 220px); overflow: auto">
        <div ref="scrollComponent" class="list-group">
          <SearchResultEntryShort
            v-for="entry in searchData"
            :key="entry"
            :entry-data="entry"
          />
        </div>
      </div>
    </div>
    <div class="col px-3">
      <div class="form-check container py-2">
        <input
          id="viewToggle"
          v-model="conceptViewToggle"
          class="form-check-input"
          type="checkbox"
        />
        <label for="viewToggle">{{ $t("id.tableview") }}</label>
      </div>
      <h2>{{ data[uri]?.label }}</h2>

      <div v-if="conceptViewToggle">
        <h3>{{ $t("id.languagedata") }}</h3>
        <table class="table table-sm table-hover table-borderless">
          <!--Header-->
          <thead>
            <tr>
              <th class="col-2" scope="col"></th>
              <th
                v-for="lang in displayInfo.displayLanguages"
                :key="'langSection_' + lang"
                scope="col"
              >
                {{ $t("global.lang." + lang) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!--PrefLabel-->
            <tr
              v-for="(e, i) in displayInfo.prefLabelLength"
              :key="'prefLabel_' + i"
            >
              <th scope="row">{{ $t("id.prefLabel") }}</th>
              <td
                v-for="lang in displayInfo.displayLanguages"
                :key="'prefLabel_' + lang + i"
              >
                {{
                  data[data[uri]?.prefLabel[lang]?.[i]]?.literalForm["@value"]
                }}
              </td>
              <!--Kontekst?-->
            </tr>
            <!--AltLabel-->
            <tr
              v-for="(e, i) in displayInfo.altLabelLength"
              :key="'altLabel_' + i"
            >
              <th scope="row">{{ $t("id.altLabel") }}</th>
              <td
                v-for="lang in displayInfo.displayLanguages"
                :key="'altLabel_' + lang + i"
              >
                {{
                  data[data[uri]?.altLabel[lang]?.[i]]?.literalForm["@value"]
                }}
              </td>
            </tr>
            <!--HiddenLabel-->
            <tr
              v-for="(e, i) in displayInfo.hiddenLabelLength"
              :key="'hiddenLabel_' + i"
            >
              <th scope="row">{{ $t("id.hiddenLabel") }}</th>
              <td
                v-for="lang in displayInfo.displayLanguages"
                :key="'hiddenLabel' + lang + i"
              >
                {{
                  data[data[uri]?.hiddenLabel[lang]?.[i]]?.literalForm["@value"]
                }}
              </td>
            </tr>
            <!--Definisjon-->
          </tbody>
        </table>
      </div>

      <div
        v-for="lang in displayInfo.displayLanguages"
        v-else
        :key="'disp_' + lang"
      >
        <h3>{{ $t("global.lang." + lang) }}</h3>
        <table class="table table-sm table-hover table-borderless">
          <tbody>
            <!--Anbefalt term-->
            <DataRow
              v-for="label in data[uri]?.prefLabel?.[lang]"
              :key="'prefLabel_' + label"
              :data="data[label]?.literalForm['@value']"
              th-class="col-2"
              :label="$t('id.prefLabel')"
            />
            <!--AltLabel-->
            <DataRow
              v-for="label in data[uri]?.altLabel?.[lang]"
              :key="'altLabel_' + label"
              :data="data[label]?.literalForm['@value']"
              th-class="col-2"
              :label="$t('id.altLabel')"
            />
            <!--HiddenLabel-->
            <DataRow
              v-for="label in data[uri]?.hiddenLabel?.[lang]"
              :key="'hiddenLabel_' + label"
              :data="data[label]?.literalForm['@value']"
              th-class="col-2"
              :label="$t('id.hiddenLabel')"
            />
          </tbody>
        </table>
      </div>

      <h3 v-if="data[uri]">{{ $t("id.general") }}</h3>
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
            th-class="col-2"
            :label="$t('id.domain')"
          />
          <!--Bruksområde-->
          <DataRow
            v-if="data[uri]?.subject"
            :data="data[uri]?.subject.join(', ')"
            th-class="col-2"
            :label="$t('id.subject')"
          />
          <!--Modified-->
          <DataRow
            v-if="data[uri]?.modified"
            :data="data[uri]?.modified['@value']"
            th-class="col-2"
            :label="$t('id.modified')"
          />
          <!--Created-->
          <!--Note TODO after export fix-->
          <DataRow
            v-if="data[uri]?.scopeNote"
            :data="data[uri]?.scopeNote"
            th-class="col-2"
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
const searchData = useSearchData();

const fetchedData = ref({});
const data = computed(() => {
  const identified = identifyData(fetchedData.value?.["@graph"]);
  const labeled = idLabelsWithLang(
    identified,
    [uri],
    ["prefLabel", "altLabel", "hiddenLabel"]
  );
  return labeled;
});
const displayInfo = computed(() => {
  const conceptLanguages = getConceptLanguages(data.value[uri]);
  const displayLanguages = dataDisplayLanguages.value.filter((language) =>
    Array.from(conceptLanguages).includes(language)
  );
  const prefLabelLength = getMaxNumberOfInstances(data.value?.[uri]?.prefLabel);
  const altLabelLength = getMaxNumberOfInstances(data.value?.[uri]?.altLabel);
  const hiddenLabelLength = getMaxNumberOfInstances(
    data.value?.[uri]?.hiddenLabel
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
