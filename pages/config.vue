<template>
  <div>
    <Head>
      <Title>{{ $t("config.title") }} | {{ $t("index.title") }}</Title>
    </Head>
    <h1 id="config" class="pb-3 text-3xl">
      <NuxtLink to="#config">{{ $t("config.title") }}</NuxtLink>
    </h1>
    <h2 id="global" class="pb-2 text-2xl">
      <NuxtLink to="#global">{{ $t("config.global") }}</NuxtLink>
    </h2>

    <div>
      <label for="locale-select" class="text-lg"
        >{{ $t("global.language") }}:
      </label>
      <select id="locale-select" class="tp-search-dd">
        <option v-for="lang in ['nb', 'nn', 'en']" :key="lang" :value="lang">
          {{ $t("global.lang." + lang) }}
        </option>
      </select>
      (deaktivert)
    </div>
    <h2 id="conceptview" class="pt-3 pb-2 text-2xl">
      <NuxtLink to="#conceptview">{{ $t("config.conceptview") }}</NuxtLink>
    </h2>
    <h3 id="dataDispLang" class="pb-1 text-xl">
      <NuxtLink to="#dataDispLang">{{ $t("config.dataDispLang") }}</NuxtLink>
    </h3>
    <div class="grid w-72 grid-flow-col grid-rows-6">
      <div v-for="lang in languageOrder[$i18n.locale]" :key="lang" class="w-32">
        <input
          :id="`ddl-${lang}`"
          v-model="dataDisplayLanguages"
          class="checked:bg-tpblue-400"
          type="checkbox"
          :value="lang"
        />
        <label class="px-1 py-1 text-lg" :for="`ddl-${lang}`">{{
          $t("global.lang." + lang)
        }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
// v-model="$i18n.locale"
const dataDisplayLanguages = useDataDisplayLanguages();
</script>
