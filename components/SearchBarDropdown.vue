<template>
  <div class="flex gap-x-2">
    <div :id="`${dropdown}Label`" class="py-1 text-lg">
      {{ $t("searchBar." + dropdown) }}:
    </div>
    <select
      v-model="searchOptions[dropdown]"
      class="form-select tp-search-dd"
      :aria-labelledby="`${dropdown}Label`"
    >
      <slot></slot>
    </select>
  </div>
</template>

<script setup>
const searchOptions = useSearchOptions();
const props = defineProps({
  dropdown: { type: String, required: true },
});
</script>

<style scoped>
.tp-search-dd {
  margin-right: 7px;
  margin-bottom: 7px;
  padding: 7px;
  background-color: white;
  border: solid;
  border-color: #d1d5db;
  border-width: 1px;
  border-radius: 4px;
}
</style>
