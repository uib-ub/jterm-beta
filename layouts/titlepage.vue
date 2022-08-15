<template>
  <div>
    <NavBar />
    <div class="container-md p-4 min-vh-100" style="background-color: white">
      <h1 class="py-3 px-1">Termportalen</h1>
      <SearchBar />
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style>
</style>