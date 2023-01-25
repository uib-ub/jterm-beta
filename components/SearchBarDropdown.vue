<template>
  <div class="flex flex-wrap gap-x-2">
    <label :for="`${dropdown}Select`" class="py-1">
      {{ $t("searchBar." + dropdown) }}:
    </label>
    <select
      :id="`${dropdown}Select`"
      v-model="searchOptions[dropdown]"
      class="form-select tp-search-dd p-1 sm:px-2 sm:h-9 cursor-pointer"
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