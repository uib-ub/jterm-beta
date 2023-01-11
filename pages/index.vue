<template>
  <div class="flex flex-wrap md:flex-row">
    <Head>
      <Title>{{ $t("index.title") }}</Title>
    </Head>
    <WelcomeTP class="md:basis-3/5 md:pr-4"/>
    <DomainOverview class="md:basis-2/5 pt-5 md:pt-0"/>
  </div>
</template>

<script setup>

</script>

<style>
h2 {
  font-size: x-large;
}
</style>
