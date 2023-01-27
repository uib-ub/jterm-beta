<template>
  <b
    v-if="predicate == 'prefLabel'"
    :lang="(intersectUnique(
              languageOrder[$i18n.locale as LocalLangCode],
              labelLang as LangCode[])[0]
            )"
    class="grow"
    :class="{
              'text-right': langRtoL(labelLang[0] as LangCode)
            }"
    v-html="labelData"
  ></b>
  <span
    v-else
    :lang="(intersectUnique(
              languageOrder[$i18n.locale as LocalLangCode],
              labelLang as LangCode[])[0]
            )"
    v-html="labelData"
  ></span>
</template>

<script setup lang="ts">
import { LangCode, LocalLangCode } from "../utils/vars-language";

const props = defineProps({
  predicate: { type: String, required: true },
  labelData: { type: String, required: true },
  labelLang: { type: Array, required: true },
});
</script>
