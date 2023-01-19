<template>
  <div class="flex h-screen flex-col">
    <NavBar />
    <main
      role="main"
      class="container mx-auto max-w-screen-xl flex-1 bg-white p-2 xs:p-4 sm:p-5 md:p-7 lg:p-9 xl:p-10"
    >
      <h1
        v-if="route.path === '/'"
        class="xs:text-6xl pb-6 text-5xl font-light tracking-tight text-black/75 antialiased sm:text-7xl md:text-8xl"
      >
        Termportalen
      </h1>
      <SearchBar />
      <slot />
    </main>
    <FooterTP />
  </div>
</template>

<script setup>
const route = useRoute();
</script>
