<template>
  <input
    :id="`filter-${ftype}-${fvalue}`"
    v-model="searchFilterData[ftype as keyof SearchDataStats]"
    class="form-check-input"
    type="checkbox"
    :value="fvalue"
  />
  <label :for="`filter-${ftype}-${fvalue}`"
    >{{ $t("global." + ftype + "." + fvalue) }} ({{
      searchDataStats[ftype as keyof SearchDataStats][
        fvalue as LangCode | Samling | Matching | LabelPredicate
      ]
    }})</label
  ><br />
</template>
<script setup lang="ts">
import { SearchDataStats } from "~~/composables/states";
import { LangCode, Samling, Matching, LabelPredicate } from "~~/utils/vars";

const searchFilterData = useSearchFilterData();
const searchDataStats = useSearchDataStats();
const props = defineProps({
  ftype: { type: String, required: true },
  fvalue: { type: String, required: true },
});
</script>
