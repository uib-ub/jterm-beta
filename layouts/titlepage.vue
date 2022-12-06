<template>
  <div>
    <NavBar />
    <main role="main" class="container p-4" style="background-color: white; min-height: calc(100vh - 142px)">
      <h1 class="display-3 py-3">Termportalen</h1>
      <SearchBar />
      <slot />
    </main>
    <FooterTP />
  </div>
</template>
