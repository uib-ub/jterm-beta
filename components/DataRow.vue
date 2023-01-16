<template>
  <tr class="hover:bg-gray-100">
    <th :class="thClass + ' pr-3 text-left font-semibold'" scope="row">{{ label }}</th>
    <td v-if="to">
      <NuxtLink v-if="nuxtlink" class="underline" :to="to">{{ data || to }}</NuxtLink>
      <a v-else :href="to" class="underline">{{ data || to }}</a>
    </td>
    <td v-else :class="{'text-right': dataRightAlign}">
      {{ data }}
    </td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps({
  data: { type: String, default: "" },
  dataRightAlign: { type: Boolean, default: false },
  thClass: { type: String, default: "" },
  label: { type: String, required: true },
  to: { type: String, default: "" },
  nuxtlink: Boolean,
});
</script>
