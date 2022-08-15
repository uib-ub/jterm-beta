<template>
  <div class="container">
    <h3>Config</h3>

    <h4>Data display languages</h4>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="ddl-nb" value="nb" v-model="dataDisplayLanguages">
      <label for="nb">bokmål</label><br>
      <input class="form-check-input" type="checkbox" id="ddl-nn" value="nn" v-model="dataDisplayLanguages">
      <label for="nn">nynorsk</label><br>
      <input class="form-check-input" type="checkbox" id="ddl-en" value="en" v-model="dataDisplayLanguages">
      <label for="en">engelsk</label><br>
      <input class="form-check-input" type="checkbox" id="ddl-la" value="la" v-model="dataDisplayLanguages">
      <label for="la">latin</label><br>
    </div>
  </div>

</template>

<script setup>
const dataDisplayLanguages = useDataDisplayLanguages();

</script>