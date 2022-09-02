<template>
  <div class="container py-1 px-0">
    <div class="d-flex justify-content-center align-items-center">
      <div class="container p-0 tp-language">
        <select
          class="form-select p-0 tp-language-dd"
          v-model="searchLanguage"
          aria-label="search language"
        >
          <option value="">Alle</option>
          <option value="nb">Bokmål</option>
          <option value="nn">Nynorsk</option>
          <option value="en">Engelsk</option>
          <option value="ar">Arabisk</option>
          <option value="da">Dansk</option>
          <option value="de">Tysk</option>
          <option value="es">Spansk</option>
          <option value="fa-af">Dari</option>
          <option value="fi">Finsk</option>
          <option value="fr">Fransk</option>
          <option value="it">Italiensk</option>
          <option value="la">Latin</option>
          <option value="pl">Polsk</option>
          <option value="ru">Russisk</option>
          <option value="smj">Lulesamisk</option>
          <option value="so">Somalisk</option>
          <option value="sv">Svensk</option>
          <option value="ti">Tigrinja</option>
        </select>
      </div>
      <div class="container p-0">
        <div class="input-group tp-search">
          <input
            id="searchfield"
            type="text"
            class="form-control"
            v-model="searchterm"
            placeholder="Søk"
            @keypress.enter="execSearch"
            aria-label="searchfield"
          />
          <button class="btn tp-search-btn active" type="button">Søk</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const searchterm = useSearchterm();
const searchLanguage = useSearchLanguage();

function execSearch(event) {
  let myparams = route.query;
  myparams.q = searchterm.value;
  console.log("Searching for" + searchterm.value);
  router.push({
    path: "/search",
    force: true,
    query: myparams,
  });
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
  box-shadow: 5px 5px 5px rgba(51, 51, 51, 0.1);
}

.tp-search {
  position: relative;
  box-shadow: 5px 5px 5px rgba(51, 51, 51, 0.1);
  border-radius: 0px 4px 4px 0px;
}

.tp-search input {
  height: 45px;
  text-indent: 5px;
  border: 1px solid var(--tp-blue-4);
  border-radius: 0px 3px 3px 0px;
}

.tp-search input:focus {
  text-indent: 4px;
  box-shadow: none;
  border: 2px solid var(--tp-blue-4);
}

.tp-search-btn {
  width: 115px;
  border: 1px solid var(--tp-blue-4);
  color: var(--tp-light);
  background-color: var(--tp-blue-4);
}

.tp-search-btn:hover {
  box-shadow: none;
  color: var(--tp-dark);
  background-color: var(--tp-light);
}

.tp-search-btn:active {
  box-shadow: none;
  color: var(--tp-light);
  border: 1px solid var(--tp-blue-4);
  background-color: var(--tp-blue-4);
}

</style>
