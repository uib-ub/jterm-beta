<template>
  <div>
    <SearchFilter />
    <div class="list-group">
      <NuxtLink
        class="list-group-item list-group-item-action"
        v-for="item in searchDataFiltered"
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
            {{ $t(`global.lang.${item.lang}`) }}
          </div>
          <div class="container p-0">{{ item.samling }}</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const searchData = useSearchData();
const searchDataFiltered = useSearchDataFiltered();
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

</script>
