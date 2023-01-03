<template>
  <div class="flex flex-wrap md:flex-row">
    <Head>
      <Title>{{ $t("index.title") }}</Title>
    </Head>
    <ContentDoc class="md:basis-3/5" :path="`/welcome_${$i18n.locale}`">
      <template #not-found> <h2>Velkommen</h2> </template>
    </ContentDoc>
    <ContentDoc class="md:basis-2/5 py-6 md:py-0" :path="`/samlinger_${$i18n.locale}`">
      <template #not-found></template>
    </ContentDoc>
  </div>
</template>

<script setup>

</script>

<style>
h2 {
  font-size: x-large;
}
</style>
