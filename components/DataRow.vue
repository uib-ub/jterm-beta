<template>
  <tr>
    <th :class="thClass + ' pr-3 text-left'" scope="row">{{ label }}</th>
    <td v-if="to">
      <NuxtLink v-if="nuxtlink" :to="to">{{ data || to }}</NuxtLink>
      <a v-else :href="to">{{ data || to }}</a>
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
