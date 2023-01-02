<template>
  <div class="h-screen flex flex-col">
    <NavBar />
    <main role=main class="container flex-1 mx-auto max-w-screen-lg p-5 bg-white">
      <SearchBar />
      <slot />
    </main>
    <FooterTP />
  </div>
</template>
