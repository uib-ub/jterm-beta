<template>
  <div class="p-1">
    <ul>
      <li v-for="item in data">
        <NuxtLink :to="`/${item.link}`"
          >{{ item.label }}, {{ item.lang }} {{ item.link }}</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "titlepage",
});

const data = ref({});
const searchterm = useSearchterm();

async function fetchData() {
  data.value = await $fetch("/api/termjson", {
    method: "post",
    body: generateSearchQuery(searchterm.value),
  });
  data.value = data.value.results.bindings.map(processBindings);
}
watch(searchterm, fetchData);

function processBindings(binding) {
  let link = binding.uri.value.split("/").at(-1).replace("-3A", "/");
  return {
    label: binding.term.value,
    link: link,
    lang: binding.term["xml:lang"],
  };
}
</script>
