<template>
  <tr>
    <th :class="thClass" scope="row">{{ label }} {{class}}</th>
    <td v-if="to">
      <NuxtLink v-if="nuxtlink" :to="to">{{ data || to }}</NuxtLink>
      <a v-else :href="to">{{ data || to }}</a>
    </td>
    <td v-else>
      {{ data }}
    </td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps({
  data: { type: String },
  thClass: { type: String, default: "col" },
  label: { type: String, required: true },
  to: String,
  nuxtlink: Boolean,
});
console.log(props.thClass);
</script>
