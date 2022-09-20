<template>
  <div>
    <NavBar />
    <div class="container p-4" style="background-color: white; min-height: calc(100vh - 79px)">
      <SearchBar />
      <slot />
    </div>
    <Footer />
  </div>
</template>
