<template>
  <input
    class="form-check-input"
    type="checkbox"
    id="`filter-${ftype}-${fvalue}`"
    :value="fvalue"
    v-model="searchFilterData[ftype]"
  />
  <label for="`filter-${ftype}-${fvalue}`"
    >{{ $t("global." + ftype + "." + fvalue) }} ({{
      searchDataStats[ftype as keyof SearchDataStats][fvalue]
    }})</label
  ><br />
</template>
<script setup lang="ts">
import { SearchDataStats } from '~~/composables/states';

const searchFilterData = useSearchFilterData();
const searchDataStats = useSearchDataStats();
const props = defineProps({
  ftype: { type: String, required: true },
  fvalue: {type: String, required: true},
});
</script>
