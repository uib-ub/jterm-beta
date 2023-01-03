<template>
  <tr class="hover:bg-gray-100">
    <td class="py-1 pr-5">
      <NuxtLink class="" :to="`/${entryData.link}`">
        <b
          v-if="entryData.predicate == 'prefLabel'"
          v-html="entryData.label"
        ></b>
        <span v-else v-html="entryData.label"></span>
      </NuxtLink>
    </td>
    <td class="pr-5">
      <NuxtLink class="" :to="`/${entryData.link}`">
        {{
          entryData.lang.map((l: string) => $t(`global.lang.${l}`)).join(", ")
        }}
      </NuxtLink>
    </td>
    <td class="">
      {{ entryData.samling }}
    </td>
  </tr>
</template>

<script setup lang="ts">
/*<div class="flex">
  <div v-if="searchOptions.searchTranslate != 'none'" class="container p-0">
    <b v-html="entryData.translate"></b>
  </div>
</div>
*/
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
