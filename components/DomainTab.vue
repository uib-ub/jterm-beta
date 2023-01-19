<template>
  <li class="shrink-0 hover:bg-gray-100" role="presentation">
    <button
      :id="`${tabId}Domains-tab`"
      class="rounded-t border border-b-0 border-gray-300 px-2 py-1 active:bg-gray-200"
      :class="{ activeDomain: searchOptions.searchDomain[0] == tabId }"
      :aria-current="searchOptions.searchDomain[0] == tabId"
      type="button"
      role="tab"
      @click="searchOptions.searchDomain = [tabId]"
    >
      {{ $t("global.domain." + tabId) }}
    </button>
  </li>
</template>

<script setup>
const searchOptions = useSearchOptions();

const props = defineProps({
  tabId: { type: String, required: true },
});
</script>

<style>
.activeDomain {
  @apply bg-gray-300;
}
</style>
