<template>
  <div class="row row-cols-1 row-cols-md-2 p-3">
    <Head>
      <Title>{{ $t("index.title") }}</Title>
    </Head>
    <ContentDoc class="col px-3" :path="`/welcome_${$i18n.locale}`">
      <template #not-found> <h2>Velkommen</h2> </template>
    </ContentDoc>
    <ContentDoc class="col px-3" :path="`/samlinger_${$i18n.locale}`">
      <template #not-found></template>
    </ContentDoc>
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
