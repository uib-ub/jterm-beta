<template>
  <div>
    <Head>
      <Title>Termportalen config</Title>
    </Head>
    <div class="container">
      <h1>Config</h1>
      <h2>Data display languages</h2>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-nb"
          value="nb"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-nb">bokmål</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-nn"
          value="nn"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-nn">nynorsk</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-en"
          value="en"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-en">engelsk</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-ar"
          value="ar"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-ar">arabisk</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-da"
          value="da"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-da">dansk</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-de"
          value="de"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-de">tysk</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-es"
          value="es"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-es">spank</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-fa-af"
          value="fa-af"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-fa-af">dari</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-fi"
          value="fi"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-fi">finsk</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-fr"
          value="fr"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-fr">fransk</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-it"
          value="it"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-it">italiensk</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-la"
          value="la"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-la">latin</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-pl"
          value="pl"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-pl">polsk</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-ru"
          value="ru"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-ru">russisk</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-smj"
          value="smj"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-smj">lulesamisk</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-so"
          value="so"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-so">somalisk</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-sv"
          value="sv"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-sv">svensk</label><br />
        <input
          class="form-check-input"
          type="checkbox"
          id="ddl-ti"
          value="ti"
          v-model="dataDisplayLanguages"
        />
        <label for="ddl-ti">tigrinja</label><br />
      </div>
    </div>
  </div>
</template>

<script setup>
const dataDisplayLanguages = useDataDisplayLanguages();
</script>
