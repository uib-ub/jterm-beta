<template>
  <li class="rounded border">
    <NuxtLink :to="`/${entryData.link}`">
      <div class="p-2 hover:bg-gray-100 lg:flex">
        <div class="grow justify-between sm:flex">
          <div
            class="flex grow justify-between"
            :class="{
              'sm:justify-start': searchOptions.searchTranslate !== 'none',
            }"
          >
            <b
              v-if="entryData.predicate == 'prefLabel'"
              v-html="entryData.label"
            ></b>
            <span v-else v-html="entryData.label"></span>
            <div
              v-if="searchOptions.searchLanguage === 'all'"
              class="pl-3 text-right font-light lg:hidden"
              :class="{ 'md:hidden': searchOptions.searchTranslate === 'none' }"
            >
              <span v-if="searchOptions.searchTranslate === 'none'">
                {{
                  entryData.lang
                    .map((l: string) => $t(`global.lang.${l}`))
                    .join(", ")
                }}</span
              >
              <span v-else>
                ({{
                  entryData.lang
                    .map((l: string) => $t(`global.lang.${l}`))
                    .join(", ")
                }})</span
              >
            </div>
          </div>
          <div
            v-if="searchOptions.searchLanguage === 'all'"
            class="hidden px-2 sm:w-2/5 lg:block lg:max-w-[10rem]"
            :class="{ 'md:block': searchOptions.searchTranslate === 'none' }"
          >
            {{
              entryData.lang
                .map((l: string) => $t(`global.lang.${l}`))
                .join(", ")
            }}
          </div>
          <div
            v-if="searchOptions.searchTranslate !== 'none'"
            class="flex justify-between sm:w-1/2 sm:px-2"
            :class="{
              'text-right': langRtoL(searchOptions.searchTranslate),
              'lg:w-5/12': searchOptions.searchLanguage === 'all',
            }"
          >
            <b v-html="entryData.translate"></b>
            <div class="text-right font-light sm:hidden">
              {{ $t("global.lang." + searchOptions.searchTranslate) }}
            </div>
          </div>
        </div>
        <div class="max-w-[26rem] lg:w-[26rem] lg:pl-2">
          {{ $t("global.samling." + entryData.samling) }}
        </div>
      </div>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import { LangCode } from "../utils/vars";

const searchOptions = useSearchOptions();
interface Props {
  entryData: {
    link: string;
    predicate: string;
    label: string;
    lang: string[];
    samling: string;
    translate?: string;
  };
}

const props = defineProps<Props>();
</script>
