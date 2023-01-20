<template>
  <div class="flex flex-wrap gap-x-2">
    <label :for="`${dropdown}Select`" class="py-1">
      {{ $t("searchBar." + dropdown) }}:
    </label>
    <select
      :id="`${dropdown}Select`"
      v-model="searchOptions[dropdown]"
      class="form-select tp-search-dd p-1 sm:p-2"
    >
      <slot></slot>
    </select>
  </div>
</template>

<script lang="ts" setup>
const searchOptions = useSearchOptions();
const props = defineProps({
  dropdown: { type: String, required: true },
});
</script>

<style>
.tp-search-dd {
  margin-right: 7px;
  margin-bottom: 7px;
  background-color: white;
  border: solid;
  border-color: #d1d5db;
  border-width: 1px;
  border-radius: 4px;
}
</style>
