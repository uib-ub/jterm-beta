<template>
  <div>
    <NavBar />
    <div class="container p-4 min-vh-100" style="background-color: white">
      <h1 class="display-3 py-3">Termportalen</h1>
      <SearchBar />
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style></style>
