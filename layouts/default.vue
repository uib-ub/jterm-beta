<template>
  <div>
    <NavBar />
    <div class="container-md p-4 min-vh-100" style="background-color: white">
      <SearchBar />
      <slot />
    </div>
    <Footer />
  </div>
</template>

