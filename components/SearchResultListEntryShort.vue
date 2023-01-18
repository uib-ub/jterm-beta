<template>
  <li class="rounded border">
    <NuxtLink :to="`/${entryData.link}`">
      <div class="p-2 hover:bg-gray-100 lg:flex">
        <b
          v-if="entryData.predicate == 'prefLabel'"
          v-html="entryData.label"
        ></b>
        <span v-else v-html="entryData.label"></span>
      </div>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import { LangCode } from "../utils/vars";

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
