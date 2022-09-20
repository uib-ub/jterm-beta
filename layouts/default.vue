<template>
  <div>
    <NavBar />
    <div class="container p-4" style="background-color: white; min-height: calc(100vh - 142px)">
      <SearchBar />
      <slot />
    </div>
    <Footer />
  </div>
</template>
