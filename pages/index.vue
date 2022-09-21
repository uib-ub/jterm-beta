<template>
  <div class="row row-cols-1 row-cols-md-2 p-3">
    <ContentDoc class="col" :path="`/welcome_${$i18n.locale}`" />
    <ContentDoc class="col" :path="`/samlinger_${$i18n.locale}`" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "titlepage",
});
</script>

<style>
a {
  color: black;
}
</style>
