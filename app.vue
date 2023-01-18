<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  htmlAttrs: {
    lang: 'nb',
  }
})
</script>

<style>

body {
  overflow-y: scroll;
  @apply bg-tpblue-100;
}
</style>