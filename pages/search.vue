<template>
  <div class="list-group">
    <NuxtLink
      class="list-group-item list-group-item-action"
      v-for="item in data"
      :to="`/${item.link}`"
    >
      <div>{{ item.label }}</div>
      <div>({{ localizationData[item.lang] }})</div>
    </NuxtLink>
  </div>
</template>

<script setup>
const data = ref({});
const route = useRoute();
const searchterm = useSearchterm();
const searchLanguage = useSearchLanguage();

async function fetchData() {
  data.value = await $fetch("/api/termjson", {
    method: "post",
    body: generateSearchQuery(searchterm.value),
  });
  data.value = data.value.results.bindings.map(processBindings);
}
fetchData();
watch(route, fetchData);

function processBindings(binding) {
  const link = binding.art.value.split("/").at(-1).replace("-3A", "/");
  return {
    label: binding.tword.value,
    link: link,
    lang: binding.tword["xml:lang"],
  };
}
</script>
