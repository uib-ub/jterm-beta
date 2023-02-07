<template>
  <NuxtLink v-if="isInternal === 'internal'" :to="to"><slot /></NuxtLink>
  <NuxtLink v-else-if="isInternal === 'external'" :to="to"
    ><span class="icon-pad">
      <slot />
    </span>
    <Icon name="mdi:external-link" aria-hidden="true"
  /></NuxtLink>
  <NuxtLink v-else :to="to"><slot /></NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  to: { type: String, required: true },
});
const isInternal = computed(() => {
  if (props.to.startsWith("/") || props.to.startsWith("#")) {
    return "internal";
  } else if (props.to.startsWith("http")) {
    return "external";
  }
});
</script>

<style>
.icon-pad {
  padding-right: 2px;
}
</style>
