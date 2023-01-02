<template>
  <div class="flex h-screen flex-col">
    <NavBar />
    <main
      role="main"
      class="container mx-auto max-w-screen-lg flex-1 bg-white p-2 sm:p-4 md:p-7 lg:p-10"
    >
      <h1
        class="xs:text-6xl py-6 text-5xl font-light tracking-tight text-black/75 antialiased sm:text-7xl md:text-8xl"
      >
        Termportalen
      </h1>
      <SearchBar />
      <slot />
    </main>
    <FooterTP />
  </div>
</template>
