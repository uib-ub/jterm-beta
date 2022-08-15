<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
body::before {
  display: block;
  content: '';
  height: 65px;

}

body {
  overflow-y: scroll;
  background-color: #e2efff;
}
</style>