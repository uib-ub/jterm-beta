<template>
  <div>
    <Head>
      <Title>{{ $t("config.title") }} | {{ $t("index.title") }}</Title>
    </Head>
    <h1 class="text-3xl">{{ $t("config.title") }}</h1>
    <h2 class="text-2xl">{{ $t("config.global") }}</h2>
    <form>
      <label for="locale-select">{{ $t("global.language") }}: </label>
      <select id="locale-select" v-model="$i18n.locale">
        <option value="nb">{{ $t("global.lang.nb") }}</option>
        <option value="nn">{{ $t("global.lang.nn") }}</option>
        <option value="en">{{ $t("global.lang.en") }}</option>
      </select>
    </form>
    <h2 class="text-2xl pt-3">{{ $t("config.conceptview") }}</h2>
    <h3 class="text-xl">{{ $t("config.dataDispLang") }}</h3>
    <div class="form-check">
      <input
        id="ddl-nb"
        v-model="dataDisplayLanguages"
        class="form-check-input"
        type="checkbox"
        value="nb"
      />
      <label for="ddl-nb">{{ $t("global.lang.nb") }}</label
      ><br />
      <input
        id="ddl-nn"
        v-model="dataDisplayLanguages"
        class="form-check-input"
        type="checkbox"
        value="nn"
      />
      <label for="ddl-nn">{{ $t("global.lang.nn") }}</label
      ><br />
      <input
        id="ddl-en"
        v-model="dataDisplayLanguages"
        class="form-check-input"
        type="checkbox"
        value="en"
      />
      <label for="ddl-en">{{ $t("global.lang.en") }}</label
      ><br />
      <input
        class="form-check-input"
        type="checkbox"
        id="ddl-ar"
        value="ar"
        v-model="dataDisplayLanguages"
      />
      <label for="ddl-ar">{{ $t("global.lang.ar") }}</label
      ><br />
      <input
        class="form-check-input"
        type="checkbox"
        id="ddl-da"
        value="da"
        v-model="dataDisplayLanguages"
      />
      <label for="ddl-da">{{ $t("global.lang.da") }}</label
      ><br />
      <input
        class="form-check-input"
        type="checkbox"
        id="ddl-de"
        value="de"
        v-model="dataDisplayLanguages"
      />
      <label for="ddl-de">{{ $t("global.lang.de") }}</label
      ><br />
      <input
        class="form-check-input"
        type="checkbox"
        id="ddl-es"
        value="es"
        v-model="dataDisplayLanguages"
      />
      <label for="ddl-es">{{ $t("global.lang.es") }}</label
      ><br />
      <input
        class="form-check-input"
        type="checkbox"
        id="ddl-fi"
        value="fi"
        v-model="dataDisplayLanguages"
      />
      <label for="ddl-fi">{{ $t("global.lang.fi") }}</label
      ><br />
      <input
        class="form-check-input"
        type="checkbox"
        id="ddl-fr"
        value="fr"
        v-model="dataDisplayLanguages"
      />
      <label for="ddl-fr">{{ $t("global.lang.fr") }}</label
      ><br />
      <input
        class="form-check-input"
        type="checkbox"
        id="ddl-it"
        value="it"
        v-model="dataDisplayLanguages"
      />
      <label for="ddl-it">{{ $t("global.lang.it") }}</label
      ><br />
      <input
        class="form-check-input"
        type="checkbox"
        id="ddl-la"
        value="la"
        v-model="dataDisplayLanguages"
      />
      <label for="ddl-la">{{ $t("global.lang.la") }}</label
      ><br />
      <input
        class="form-check-input"
        type="checkbox"
        id="ddl-pl"
        value="pl"
        v-model="dataDisplayLanguages"
      />
      <label for="ddl-pl">{{ $t("global.lang.pl") }}</label
      ><br />
      <input
        class="form-check-input"
        type="checkbox"
        id="ddl-ru"
        value="ru"
        v-model="dataDisplayLanguages"
      />
      <label for="ddl-ru">{{ $t("global.lang.ru") }}</label
      ><br />
      <input
        class="form-check-input"
        type="checkbox"
        id="ddl-so"
        value="so"
        v-model="dataDisplayLanguages"
      />
      <label for="ddl-so">{{ $t("global.lang.so") }}</label
      ><br />
      <input
        class="form-check-input"
        type="checkbox"
        id="ddl-sv"
        value="sv"
        v-model="dataDisplayLanguages"
      />
      <label for="ddl-sv">{{ $t("global.lang.sv") }}</label
      ><br />
      <input
        class="form-check-input"
        type="checkbox"
        id="ddl-ti"
        value="ti"
        v-model="dataDisplayLanguages"
      />
      <label for="ddl-ti">{{ $t("global.lang.ti") }}</label
      ><br />
    </div>
  </div>
</template>

<script setup>
const dataDisplayLanguages = useDataDisplayLanguages();
</script>
