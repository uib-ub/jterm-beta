<template>
  <NuxtLink
    class="list-group-item list-group-item-action"
    :to="`/${entryData.link}`"
  >
    <div class="d-flex flex-lg-row">
      <div class="container p-0">
        <div v-if="entryData.predicate == 'prefLabel'">
          <div class="container p-0">
            <b v-html="entryData.label"></b>
          </div>
        </div>
        <div v-else>
          <div class="container p-0" v-html="entryData.label"></div>
        </div>
      </div>
      <div class="container px-3">
        {{
          entryData.lang.map((l: string) => $t(`global.lang.${l}`)).join(", ")
        }}
      </div>
      <div v-if="searchOptions.searchTranslate != 'none'" class="container p-0">
        <b v-html="entryData.translate"></b>
      </div>
      <div class="container p-0">{{ entryData.samling }}</div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const searchOptions = useSearchOptions();
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

<style>
.searchHighlight {
  background-color: var(--tp-blue-1);
}
</style>
