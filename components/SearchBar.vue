<template>
  <div class="container py-1 px-0">
    <div class="d-flex justify-content-center align-items-center">
      <div class="container p-0 tp-language">
        <select
          class="form-select p-0 tp-language-dd"
          v-model="searchOptions.searchLanguage"
          aria-label="search language"
        >
          <option value="">{{ $t("global.lang.all") }}</option>
          <option value="nb">{{ $t("global.lang.nb") }}</option>
          <option value="nn">{{ $t("global.lang.nn") }}</option>
          <option value="en">{{ $t("global.lang.en") }}</option>
          <option value="ar">{{ $t("global.lang.ar") }}</option>
          <option value="da">{{ $t("global.lang.da") }}</option>
          <option value="de">{{ $t("global.lang.de") }}</option>
          <option value="es">{{ $t("global.lang.es") }}</option>
          <option value="fi">{{ $t("global.lang.fi") }}</option>
          <option value="fr">{{ $t("global.lang.fr") }}</option>
          <option value="it">{{ $t("global.lang.it") }}</option>
          <option value="la">{{ $t("global.lang.la") }}</option>
          <option value="pl">{{ $t("global.lang.pl") }}</option>
          <option value="ru">{{ $t("global.lang.ru") }}</option>
          <option value="so">{{ $t("global.lang.so") }}</option>
          <option value="sv">{{ $t("global.lang.sv") }}</option>
          <option value="ti">{{ $t("global.lang.ti") }}</option>
        </select>
      </div>
      <div class="container p-0">
        <div class="input-group tp-search">
          <input
            id="searchfield"
            type="text"
            class="form-control"
            v-model="searchterm"
            :placeholder="$t('searchBar.search')"
            @keypress.enter="execSearch"
            @focus="$event.target.select()"
            aria-label="searchfield"
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
              v-on:click="clearText"
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
  let myparams = route.query;
  searchOptions.value.searchTerm = searchterm.value;
  myparams.q = searchOptions.value.searchTerm;
  router.push({
    path: "/search",
    force: true,
    query: myparams,
  });
  fetchSearchData(searchData);
  searchbutton.focus();
  searchfield.focus();
}
</script>

<style>
.tp-language {
  width: 116px;
}

.tp-language-dd {
  height: 45px;
  width: 120px;
  text-indent: 4px;
  float: left;
  border: 1px solid var(--tp-blue-4);
  border-radius: 4px 0px 0px 4px;
  box-shadow: 5px 5px 5px rgba(51, 51, 51, 0.1);
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
