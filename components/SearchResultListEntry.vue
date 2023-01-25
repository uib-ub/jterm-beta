<template>
  <li class="rounded border">
    <NuxtLink :to="`/${entryData.link}`">
      <div class="p-2 hover:bg-gray-100 lg:flex">
        <div class="grow justify-between sm:flex">
          <div
            class="flex grow justify-between"
            :class="{
              'sm:justify-start': searchOptions.searchTranslate !== 'none',
              'text-right': langRtoL(entryData.lang[0] as LangCode)
            }"
          >
            <SearchResultLabel
              :predicate="entryData.predicate"
              :label-data="entryData.label"
              :label-lang="entryData.lang"
            />
            <div
              v-if="searchOptions.searchLanguage === 'all'"
              class="pl-3 text-right font-light lg:hidden"
              :class="{ 'md:hidden': searchOptions.searchTranslate === 'none' }"
            >
              <span>
                <span
                  class="hidden"
                  :class="{
                    'sm:inline': searchOptions.searchTranslate !== 'none',
                  }"
                  >(</span
                ><span>
                  {{
                    entryData.lang
                      .map((l: string) => $t(`global.lang.${l}`))
                      .join(", ")
                  }} </span
                ><span
                  class="hidden"
                  :class="{
                    'sm:inline': searchOptions.searchTranslate !== 'none',
                  }"
                  >)</span
                ></span
              >
            </div>
          </div>
          <div
            v-if="searchOptions.searchLanguage === 'all'"
            class="hidden px-2 sm:w-2/5 lg:block lg:max-w-[10rem]"
            :class="{ 'md:block': searchOptions.searchTranslate === 'none' }"
          >
            {{
              intersectUnique(
                languageOrder[$i18n.locale as LangCode],
                entryData.lang
              )
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

<style scoped>
li {
  margin-bottom: -1px;
}
</style>
