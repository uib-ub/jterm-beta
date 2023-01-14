<template>
  <div class="flex gap-x-2">
    <label :for="`${dropdown}Select`" class="py-1 text-lg">
      {{ $t("searchBar." + dropdown) }}:
    </label>
    <select
      :id="`${dropdown}Select`"
      v-model="searchOptions[dropdown]"
      class="form-select tp-search-dd"
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
  padding: 7px;
  background-color: white;
  border: solid;
  border-color: #d1d5db;
  border-width: 1px;
  border-radius: 4px;
}
</style>
