<template>
  <div>
    <NavBar />
    <main role=main class="container p-4" style="background-color: white; min-height: calc(100vh - 142px)">
      <SearchBar />
      <slot />
    </main>
    <FooterTP />
  </div>
</template>
