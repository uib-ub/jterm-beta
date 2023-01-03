<template>
  <nav class="bg-tpblue-400 flex" role="navigation">
    <div
      class="mx-auto flex max-w-screen-lg grow justify-between p-2 text-white"
    >
      <div>
        <NuxtLink
          to="/"
          class="text-xl font-medium text-white hover:text-gray-200"
          alt="termportalen.no"
          >Termportalen.no</NuxtLink
        >
      </div>
      <div class="">
        <div class="xs:hidden">
          <button
            class="ml-auto mr-0 flex rounded border border-white px-3 py-2 text-white hover:border-white hover:text-white"
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
          <li class="text-lg text-white hover:text-gray-200">
            <NuxtLink to="/about"> {{ $t("navBar.about") }}</NuxtLink>
          </li>
          <li class="text-lg text-white hover:text-gray-200">
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
