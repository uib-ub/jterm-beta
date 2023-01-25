<template>
  <nav class="bg-tpblue-400 flex text-white">
    <div
      class="xs:px-3 mx-auto flex max-w-screen-xl grow justify-between py-2 px-2 sm:px-4 md:px-5"
    >
      <div
        class="text-xl font-medium decoration-inherit hover:text-gray-200 hover:underline"
      >
        <NuxtLink to="/">Termportalen.no</NuxtLink>
      </div>
      <div class="text-lg">
        <div class="xs:hidden">
          <button
            class="ml-auto mr-0 flex rounded border border-white px-3 py-2 hover:border-gray-200 hover:text-gray-200"
            @click="navMenuExpanded = !navMenuExpanded"
          >
            <svg
              class="h-3 w-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <ul
          id="NavMenuContent"
          class="xs:flex xs:gap-4 xs:pt-0 xs:space-y-0 space-y-2 pt-3"
          :class="{ hidden: !navMenuExpanded }"
        >
          <li>
            <NuxtLink
              to="/about"
              class="decoration-inherit hover:text-gray-200 hover:underline"
              @click="navMenuExpanded = false"
            >
              {{ $t("navBar.about") }}</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/config"
              class="decoration-inherit hover:text-gray-200 hover:underline"
              @click="navMenuExpanded = false"
            >
              {{ $t("navBar.config") }}</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
const navMenuExpanded = ref(false);
</script>
