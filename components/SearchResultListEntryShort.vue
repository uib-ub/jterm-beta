<template>
  <li class="rounded border">
    <NuxtLink :to="`/${entryData.link}`">
      <div class="p-2 hover:bg-gray-100 lg:flex">
        <SearchResultLabel
          :predicate="entryData.predicate"
          :label-data="entryData.label"
          :label-lang="entryData.lang"
        />
      </div>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">

interface Props {
  entryData: {
    link: string;
    predicate: string;
    label: string;
    lang: string[];
    samling: string;
    translate?: string;
  };
}

const props = defineProps<Props>();
</script>
<style scoped>
li {
  margin-bottom: -1px;
}
</style>