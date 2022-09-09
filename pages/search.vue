<template>
  <div>
    <div class="container p-4">{{ data.length }} resultater</div>
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
  </div>
</template>

<script setup>
const data = ref({});
const route = useRoute();
const searchterm = useSearchterm();

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
