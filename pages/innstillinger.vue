<template>
  <main id="main">
    <Head>
      <Title>{{ $t("innstillinger.title") }} | {{ $t("index.title") }}</Title>
    </Head>
    <h1 id="innstillinger" class="pt-5 pb-2 text-3xl">
      <AppLink to="#innstillinger">{{ $t("innstillinger.title") }}</AppLink>
    </h1>
    <section>
      <h2 id="global" class="pb-2 text-2xl">
        <AppLink to="#global">{{ $t("innstillinger.global") }}</AppLink>
      </h2>
      <label for="locale-select" class="text-lg"
        >{{ $t("global.language") }}:
      </label>
      <select
        id="locale-select"
        class="tp-search-dd cursor-pointer px-2 py-1 text-lg"
      >
        <option v-for="lang in ['nb', 'nn', 'en']" :key="lang" :value="lang">
          {{ $t("global.lang." + lang) }}
        </option>
      </select>
      <span class="text-lg"> (deaktivert)</span>
    </section>
    <section>
      <h2 id="conceptview" class="pt-3 pb-2 text-2xl">
        <AppLink to="#conceptview">{{ $t("innstillinger.conceptview") }}</AppLink>
      </h2>
      <fieldset>
        <legend id="dataDispLang" class="pb-1 text-xl">
          <AppLink to="#dataDispLang">{{ $t("innstillinger.dataDispLang") }}</AppLink>
        </legend>
        <div class="grid w-72 grid-flow-col grid-rows-6 gap-y-2 gap-x-3">
          <div v-for="lang in languageOrder[$i18n.locale]" :key="lang">
            <input
              :id="`ddl-${lang}`"
              v-model="dataDisplayLanguages"
              class="checked:bg-tpblue-400 cursor-pointer"
              type="checkbox"
              :value="lang"
            />
            <label
              class="cursor-pointer px-1 py-1 text-lg"
              :for="`ddl-${lang}`"
              >{{ $t("global.lang." + lang) }}</label
            >
          </div>
        </div>
      </fieldset>
    </section>
  </main>
</template>

<script setup>
// v-model="$i18n.locale"
const dataDisplayLanguages = useDataDisplayLanguages();
</script>
