<template>
  <a :href="to" target="_blank">
    <span>
      <slot> </slot>
    </span>
    <Icon name="mdi:external-link" aria-hidden="true"
  /></a>
</template>

<script setup>
const props = defineProps({
  to: { type: String, required: true },
});
</script>

<style>
span {
  padding-right: 2px;
}
</style>
