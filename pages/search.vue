<template>
  <div>
    <SearchFilter />
    <div class="list-group">
      <NuxtLink
        class="list-group-item list-group-item-action"
        v-for="item in searchData"
        :to="`/${item.link}`"
      >
        <div class="d-flex flex-lg-row">
          <div class="container p-0">
            <div v-if="item.predicate == 'prefLabel'">
              <div class="container p-0">
                <b>{{ item.label }}</b>
              </div>
            </div>
            <div v-else>
              <div class="container p-0">{{ item.label }}</div>
            </div>
          </div>

          <div class="container px-3">
            {{ localizationData[item.lang] || item.lang }}
          </div>
          <div class="container p-0">{{ item.samling }}</div>
        </div>
      </NuxtLink>
      <div>{{ searchData }}</div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const searchData = useSearchData();
const searchterm = useSearchterm();

async function fetchData() {
  searchData.value = await $fetch("/api/termjson", {
    method: "post",
    body: generateSearchQuery(searchterm.value),
  });
  searchData.value = searchData.value.results.bindings.map(processBindings);
}
fetchData();
watch(route, fetchData);

function processBindings(binding) {
  const link = binding.uri.value.split("/").at(-1).replace("-3A", "/");
  const samling = binding.samling.value.split("/").at(-1).split("3A").at(-1);
  const predicate = binding.predicate.value.replace(
    "http://www.w3.org/2008/05/skos-xl#",
    ""
  );
  return {
    predicate: predicate,
    label: binding.term.value,
    link: link,
    lang: binding.term["xml:lang"],
    samling: samling,
  };
}
</script>
