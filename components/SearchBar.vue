<template>
  <div class="flex justify-center">
    <div class="grow">
      <DomainTabs />
      <div
        class="input-group focus:border-tpblue-300 relative flex items-stretch rounded border border-solid border-gray-300"
      >
        <input
          id="searchfield"
          v-model="searchterm"
          type="search"
          class="form-control focus:border-tpblue-300 flex-auto rounded bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border focus:bg-white focus:text-gray-700 focus:outline-none"
          :placeholder="$t('searchBar.search')"
          aria-label="Searchfield"
          aria-describedby="searchbutton"
          @keypress.enter="execSearch"
          @focus="$event.target.select()"
        />
        <button
          type="button"
          class="w-9"
          aria-label="Clear searchfield"
          @click="clearText"
        >
          x
        </button>
        <button
          id="searchbutton"
          class="bg-tpblue-400 inline-block items-center rounded px-6 py-2.5 text-white transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
          type="button"
          aria-label="search button"
          @click="execSearch"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="search"
            class="w-4"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
            ></path>
          </svg>
        </button>
      </div>
      <div class="flex flex-wrap py-2">
        <select
          v-model="searchOptions.searchLanguage"
          class="form-select tp-search-dd"
          aria-label="search language"
        >
          <option value="all">
            {{ $t("global.lang.all") }}
          </option>
          <option
            v-for="lc in languageOrder[$i18n.locale]"
            :key="'searchlang_' + lc"
            :value="lc"
          >
            {{ $t("global.lang." + lc) }}
          </option>
        </select>
        <select
          v-model="searchOptions.searchTranslate"
          class="form-select tp-search-dd"
          aria-label="translation language"
        >
          <option value="none">
            {{ $t("global.lang.none") }}
          </option>
          <option
            v-for="lc in languageOrder[$i18n.locale]"
            :key="'translationlang_' + lc"
            :value="lc"
          >
            {{ $t("global.lang." + lc) }}
          </option>
        </select>
        <select
          v-model="searchOptions.searchBase"
          class="form-select tp-search-dd"
          aria-label="search termbase"
        >
          <option
            v-for="samling in samlingOrder"
            :key="'searchsamling_' + samling"
            :value="samling"
          >
            {{ $t("global.samling." + samling) }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const searchOptions = useSearchOptions();
const searchterm = useSearchterm();
const searchData = useSearchData();

const clearText = () => {
  searchterm.value = "";
};

function execSearch() {
  searchData.value = [];
  const myparams = route.query;
  searchOptions.value.searchTerm = searchterm.value;
  myparams.q = searchOptions.value.searchTerm;
  router.push({
    path: "/search",
    force: true,
    query: myparams,
  });
  useFetchSearchData(searchOptions.value, "initial");
  searchbutton.focus();
  searchfield.focus();
}
</script>

<style scoped>
.tp-search-dd {
  margin-right: 7px;
  margin-bottom: 7px;
  padding: 7px;
  background-color: white;
  border: solid;
  border-color: #d1d5db;
  border-width: 1px;
  border-radius: 4px;
}
</style>
