<template>
  <b
    v-if="predicate == 'prefLabel'"
    :lang="(labelLang[0] as LangCode)"
    class="grow"
    :class="{
              'text-right': langRtoL(labelLang[0] as LangCode)
            }"
    v-html="labelData"
  ></b>
  <span v-else :lang="(labelLang[0] as LangCode)" v-html="labelData"></span>
</template>

<script setup lang="ts">
import { LangCode } from "../utils/vars";

const props = defineProps({
  predicate: { type: String, required: true },
  labelData: { type: String, required: true },
  labelLang: { type: Array, required: true },
});
</script>
