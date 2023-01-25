<template>
  <tr class="hover:bg-gray-100">
    <th :class="thClass + ' pr-3 text-left font-semibold'" scope="row">
      {{ label }}
    </th>
    <td
      v-if="to"
      :lang="dataLang"
      :class="{ 'text-right': langRtoL(dataLang as LangCode) }"
    >
      <NuxtLink v-if="nuxtlink" class="underline hover:decoration-2" :to="to">{{
        data || to
      }}</NuxtLink>
      <a v-else :href="to" class="underline hover:decoration-2">{{
        data || to
      }}</a>
    </td>
    <td
      v-else
      :class="{ 'text-right': langRtoL(dataLang as LangCode) }"
      :lang="dataLang"
    >
      {{ data }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import { LangCode } from "../utils/vars";

const props = defineProps({
  data: { type: String, default: "" },
  thClass: { type: String, default: "" },
  label: { type: String, required: true },
  to: { type: String, default: "" },
  nuxtlink: Boolean,
  dataLang: { type: String, default: null },
});
</script>
