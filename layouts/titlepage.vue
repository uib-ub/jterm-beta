<template>
  <div>
    <NavBar />
    <div class="container p-4" style="background-color: white; min-height: calc(100vh - 79px)">
      <h1 class="display-3 py-3">Termportalen</h1>
      <SearchBar />
      <slot />
    </div>
    <Footer />
  </div>
</template>
