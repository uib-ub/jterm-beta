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
:root {
  --tp-dark: black;
  --tp-blue-4: #14417b;
  --tp-blue-3: #008aff;
  --tp-blue-2: #69b9fe;
  --tp-blue-1: #e2efff;
  --tp-light: white;
}

body::before {
  display: block;
  content: '';
  height: 55px;

}

body {
  overflow-y: scroll;
  background-color: var(--tp-blue-1);
}
</style>