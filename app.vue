<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  htmlAttrs: {
    lang: "nb",
  },
});

const searchBarWasFocused = useSearchBarWasFocused();
const route = useRoute();

watch(
  () => route.path,
  () => {
    searchBarWasFocused.value = false;
  }
);
</script>

<style>
body {
  overflow-y: scroll;
  @apply bg-tpblue-100;
}

.tp-shighlight {
  @apply bg-tpblue-100;
}

.tp-search-dd {
  margin-right: 7px;
  margin-bottom: 7px;
  background-color: white;
  border: solid;
  border-color: #d1d5db;
  border-width: 1px;
  border-radius: 4px;
}

.tp-transition-slow {
  transition: all 450ms cubic-bezier(0.235, 0.615, 0.115, 0.995);
}
</style>
