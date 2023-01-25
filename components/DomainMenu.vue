<template>
  <div class="px-1 text-sm xs:text-base">
    <div class="rounded-t border border-b-0 border-gray-300">
      <button
        class="min-w-full rounded-t px-2 py-1 text-left hover:bg-gray-100"
        @click="displayDomainMenu = !displayDomainMenu"
      >
        <span v-if="searchOptions.searchDomain[0] !== 'all'">{{ $t("global.domain.domain") }}: </span>
        {{ $t("global.domain." + searchOptions.searchDomain[0]) }}
      </button>
      <ul
        v-if="displayDomainMenu"
        id="domainTab"
        class="gap-x-2 border-t border-gray-300"
      >
        <li
          v-for="domain in ['all'].concat(Object.keys(domainNesting))"
          :key="domain"
          class="hover:bg-gray-100"
          :class="{ activeDomain: searchOptions.searchDomain[0] == domain }"
        >
          <button
            class="min-w-full px-2 py-1 text-left"
            :aria-current="searchOptions.searchDomain[0] == domain"
            @click="
              (searchOptions.searchDomain = [domain]),
                (displayDomainMenu = false)
            "
          >
            {{ $t("global.domain." + domain) }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchOptions = useSearchOptions();
const displayDetails = ref(false);
const displayDomainMenu = ref(false);
</script>

<style></style>
