<template>
  <Transition>
    <a href="#anchor">
      <button
        v-if="displayButton"
        class="xs:right-4 xs:bottom-4 fixed bottom-2 right-2 rounded border border-gray-400 bg-white p-1 sm:right-5 sm:bottom-5 md:right-7 md:bottom-7 lg:bottom-8 lg:right-9 xl:bottom-8 xl:right-8"
        :aria-label="$t('buttonScrollTop.srLabel')"
        :title="$t('buttonScrollTop.srLabel')"
        @click="scrollToTop()"
      >
        <Icon
          name="material-symbols:vertical-align-top"
          size="2.8em"
          class="text-gray-700"
          aria-hidden="true"
        ></Icon>
      </button> </a
  ></Transition>
</template>

<script setup>
const displayButton = ref(false);

function scrollToTop() {
  window.scrollTo(0, 0);
}

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 50) {
      displayButton.value = true;
    } else {
      displayButton.value = false;
    }
  });
});
</script>

<style>
.v-enter-active {
  transition: opacity 100ss;
}
.v-leave-active {
  transition: opacity 100ms;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
