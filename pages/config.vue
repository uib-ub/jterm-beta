<template>
  <div>

    <Head>
      <Title>Termportalen config</Title>
    </Head>
    <div class="container">
      <h1>Config</h1>

      <h2>Data display languages</h2>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="ddl-nb" value="nb" v-model="dataDisplayLanguages">
        <label for="ddl-nb">bokmål</label><br>
        <input class="form-check-input" type="checkbox" id="ddl-nn" value="nn" v-model="dataDisplayLanguages">
        <label for="ddl-nn">nynorsk</label><br>
        <input class="form-check-input" type="checkbox" id="ddl-en" value="en" v-model="dataDisplayLanguages">
        <label for="ddl-en">engelsk</label><br>
        <input class="form-check-input" type="checkbox" id="ddl-la" value="la" v-model="dataDisplayLanguages">
        <label for="ddl-la">latin</label><br>
      </div>
    </div>

  </div>
</template>

<script setup>
const dataDisplayLanguages = useDataDisplayLanguages();

</script>