<template>
  <li class="border-transparent border border-solid hover:border hover:border-gray-300 rounded px-2 py-1">
    <details>
      <summary class="text-xl cursor-pointer">
        {{ $t("global.domain." + domain) }} ({{
          domainNesting[domain].bases.length
        }})
      </summary>
      <ul class="list-disc pl-8 text-lg">
        <li
          v-for="base in intersectUnique(
            samlingOrder,
            domainNesting[domain].bases
          )"
          :key="base"
          class="hover:bg-gray-100 rounded"
        >
          <NuxtLink :to="base">{{ $t("global.samling." + base) }}</NuxtLink>
        </li>
      </ul>
    </details>
  </li>
</template>

<script setup>
const props = defineProps({
  domain: { type: String, required: true },
});
</script>
