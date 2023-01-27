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
            class="ml-auto mr-0 flex rounded border border-white px-2 py-1 hover:border-gray-200 hover:text-gray-200"
            :aria-label="
              navMenuExpanded
                ? $t('navBar.menuButtonHide')
                : $t('navBar.menuButtonShow')
            "
            :title="
              navMenuExpanded
                ? $t('navBar.menuButtonHide')
                : $t('navBar.menuButtonShow')
            "
            @click="navMenuExpanded = !navMenuExpanded"
          >
            <Icon name="tabler:menu-2" aria-hidden="true" size="1.2em" />
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
