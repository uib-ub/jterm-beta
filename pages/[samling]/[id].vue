<template>
  <div class="flex">
    <h1 class="sr-only">{{ $t("id.topheading") }}</h1>

    <div v-if="searchData.length > 0" class="hidden md:block md:w-60 lg:w-1/4">
      <div class="container h-9">
        <AppLink class="text-lg" to="/search">{{ $t("id.tilbake") }}</AppLink>
      </div>
      <nav aria-labelledby="sidebarresults">
        <h2 id="sidebarresults" class="py-3 text-2xl">
          {{ $t("searchFilter.results-heading") }}
        </h2>
        <div class="overflow-x-auto" style="height: calc(100vh * 0.7 - 100px)">
          <ol>
            <SearchResultListEntryShort
              v-for="entry in searchData"
              :key="entry"
              :entry-data="entry"
            />
          </ol>
        </div>
      </nav>
    </div>
    <div
      class="col lg:w-3/4"
      :class="{ 'pl-3 lg:pl-6': searchData.length > 0 }"
    >
      <div class="container invisible py-2">
        <input id="viewToggle" v-model="conceptViewToggle" type="checkbox" />
        <label for="viewToggle">{{ $t("id.tableview") }}</label>
      </div>

      <main id="main">
        <h2 id="ctitle" class="pb-4">
          <AppLink class="text-3xl" to="#ctitle">{{
            data[uri]?.label
          }}</AppLink>
          <span v-if="data[uri]?.memberOf"
            ><AppLink
              class="text-lg text-gray-600 underline hover:text-black"
              :to="'/' + data[uri]?.memberOf.split('-3A')[0]"
            >
              {{ $t("global.samling." + data[uri]?.memberOf.split("-3A")[0]) }}
            </AppLink></span
          >
        </h2>
        <div v-if="conceptViewToggle">
          <h3>{{ $t("id.languagedata") }}</h3>
          <table class="table-auto">
            <!--Header-->
            <thead>
              <tr>
                <th class="" scope=""></th>
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
                    data[data[uri]?.hiddenLabel[lang]?.[i]]?.literalForm[
                      "@value"
                    ]
                  }}
                </td>
              </tr>
              <!--Definisjon-->
            </tbody>
          </table>
        </div>
        <div v-else class="grid gap-y-5">
          <div
            v-for="lang in displayInfo.displayLanguages"
            :key="'disp_' + lang"
          >
            <h3 :id="lang" class="pb-1 text-xl">
              <AppLink :to="`#${lang}`">{{
                $t("global.lang." + lang)
              }}</AppLink>
            </h3>
            <table class="table-auto">
              <tbody>
                <!--Anbefalt term-->
                <DataRow
                  v-for="label in data[uri]?.prefLabel?.[lang]"
                  :key="'prefLabel_' + label"
                  :data="data[label]?.literalForm['@value']"
                  :label="$t('id.prefLabel')"
                  :data-lang="lang"
                />
                <!--AltLabel-->
                <DataRow
                  v-for="label in data[uri]?.altLabel?.[lang]"
                  :key="'altLabel_' + label"
                  :data="data[label]?.literalForm['@value']"
                  :label="$t('id.altLabel')"
                  :data-lang="lang"
                />
                <!--HiddenLabel-->
                <DataRow
                  v-for="label in data[uri]?.hiddenLabel?.[lang]"
                  :key="'hiddenLabel_' + label"
                  :data="data[label]?.literalForm['@value']"
                  :label="$t('id.hiddenLabel')"
                  :data-lang="lang"
                />
              </tbody>
            </table>
          </div>
          <div>
            <h3 v-if="data[uri]" id="felles" class="pb-1 text-xl">
              <AppLink to="#felles"> {{ $t("id.general") }}</AppLink>
            </h3>
            <table>
              <tbody>
                <!--Termbase-->
                <DataRow
                  v-if="data[uri]?.memberOf"
                  :data="
                    $t('global.samling.' + data[uri]?.memberOf.split('-3A')[0])
                  "
                  :to="`/${samling}`"
                  :label="$t('id.collection')"
                />
                <!--Domene-->
                <DataRow
                  v-if="data[uri]?.domene"
                  :data="data[uri]?.domene"
                  :label="$t('id.domain')"
                />
                <!--Bruksområde-->
                <DataRow
                  v-if="data[uri]?.subject"
                  :data="data[uri]?.subject.join(', ')"
                  :label="$t('id.subject')"
                />
                <!--Modified-->
                <DataRow
                  v-if="data[uri]?.modified"
                  :data="data[uri]?.modified['@value']"
                  :label="$t('id.modified')"
                />
                <!--Created-->
                <!--Note TODO after export fix-->
                <DataRow
                  v-if="data[uri]?.scopeNote"
                  :data="data[uri]?.scopeNote"
                  th-class=""
                  :label="$t('id.note')"
                />
              </tbody>
            </table>
          </div>
        </div>
      </main>
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
const searchOptions = useSearchOptions();

const fetchedData = ref({});
const data = computed(() => {
  if (fetchedData.value?.["@graph"]) {
    const identified = identifyData(fetchedData.value?.["@graph"]);
    const labeled = idLabelsWithLang(
      identified,
      [uri],
      ["prefLabel", "altLabel", "hiddenLabel"]
    );
    return labeled;
  } else {
    return {};
  }
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
