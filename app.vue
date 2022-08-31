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
    lang: 'no',
  }
})
</script>

<style>
body::before {
  display: block;
  content: '';
  height: 55px;

}

body {
  overflow-y: scroll;
  background-color: #e2efff;
}
</style>