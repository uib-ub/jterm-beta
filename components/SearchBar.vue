<template>
  <div class="container py-1 px-0" role="search">
    <div
      class="container py-1 px-0 d-flex justify-content-center align-items-center"
    >
      <div class="container p-0 pb-2">
        <div class="input-group tp-search">
          <input
            id="searchfield"
            v-model="searchterm"
            type="text"
            class="form-control"
            :placeholder="$t('searchBar.search')"
            aria-label="searchfield"
            @keypress.enter="execSearch"
            @focus="$event.target.select()"
          />
          <div
            style="
              border-top: 1px solid;
              border-bottom: 1px solid;
              height: 45px;
            "
          >
            <button
              type="button"
              class="btn-close m-2"
              aria-label="Clear searchfield"
              @click="clearText"
            ></button>
          </div>

          <button
            id="searchbutton"
            type="submit"
            class="btn tp-search-btn"
            @click="execSearch"
          >
            {{ $t("searchBar.search") }}
          </button>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <select
        v-model="searchOptions.searchLanguage"
        class="form-select tp-searchbar-dd"
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
        class="form-select tp-searchbar-dd"
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
        class="form-select tp-searchbar-dd"
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

<style>
.tp-searchbar-dd {
  height: 45px;
  width: 170px;
  text-indent: 4px;
}

.tp-language {
  width: 116px;
}

.tp-language-dd {
  height: 45px;
  width: 150px;
  text-indent: 4px;
}

.tp-language-dd:focus {
  height: 45px;
  width: 120px;
  text-indent: 4px;
  border: 1px solid var(--tp-blue-4);
  border-radius: 4px 0px 0px 4px;
  /* box-shadow: 0px 0px 5px rgba(56, 169, 240, 10);; */
  box-shadow: 5px 5px 5px rgba(51, 51, 51, 0.1);
}

.tp-search {
  position: relative;
  text-indent: 5px;
  box-shadow: 5px 5px 5px rgba(51, 51, 51, 0.1);
  border-radius: 0px 4px 4px 0px;
}

.tp-search input {
  height: 45px;
  text-indent: 5px;
  border: 1px solid var(--tp-blue-4);
  border-right: 0px;
  border-radius: 0px 3px 3px 0px;
}

.tp-search input:focus {
  text-indent: 4px;
  box-shadow: none;
  border: 1px solid var(--tp-blue-4);
  border-right: 0px;
}

.tp-search-btn {
  width: 115px;
  height: 45px;
  border: 1px solid var(--tp-blue-4);
  color: var(--tp-dark);
  background-color: var(--tp-light);
}

.tp-search-btn:hover {
  box-shadow: none;
  color: var(--tp-dark);
  border: 1px solid var(--tp-blue-4);
  background-color: var(--tp-light);
}

.tp-search-btn:active {
  box-shadow: none;
  color: var(--tp-light);
  border: 1px solid var(--tp-blue-4);
  background-color: var(--tp-blue-4);
}
</style>
