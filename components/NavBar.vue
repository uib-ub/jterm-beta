<template>
  <nav class="bg-tpblue-400 flex text-white" role="navigation">
    <div class="mx-auto flex max-w-screen-xl grow justify-between py-2 px-5">
      <div class="text-xl font-medium hover:text-gray-200">
        <NuxtLink to="/">Termportalen.no</NuxtLink>
      </div>
      <div class="text-lg">
        <div class="xs:hidden">
          <button
            class="ml-auto mr-0 flex rounded border border-white px-3 py-2 hover:border-white hover:text-white"
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
          class="xs:flex xs:gap-3"
          :class="{ hidden: !navMenuExpanded }"
        >
          <li class="hover:text-gray-200">
            <NuxtLink to="/about"> {{ $t("navBar.about") }}</NuxtLink>
          </li>
          <li class="hover:text-gray-200">
            <NuxtLink to="/config"> {{ $t("navBar.config") }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
const navMenuExpanded = ref(false);
</script>
