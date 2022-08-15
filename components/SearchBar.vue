<template>
  <div class="py-1">
    <input class="m-2" v-model="searchterm" @keypress.enter="execSearch" /><br>


    <select class="mx-2" name="searchLang" id="searchLang" v-model="searchLanguage">
      <option value="">Alle</option>
      <option value="nb">Bokmål</option>
      <option value="nn">Nynorsk</option>
      <option value="en">Engelsk</option>
      <option value="de">Tysk</option>
      <option value="la">Latin</option>
    </select>
    <label for="searchLang">Språk</label>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter();
const searchterm = useSearchterm();
const searchLanguage = useSearchLanguage();

function execSearch(event) {
  let myparams = route.query
  myparams.q = searchterm.value
  console.log("Searching for" + searchterm.value)
  router.push({
    path: "/search",
    force: true,
    query: myparams,
  });
};

</script>
