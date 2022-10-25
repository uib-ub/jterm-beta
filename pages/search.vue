<template>
  <div>
    <SearchFilter />
    <div class="list-group">
      <NuxtLink
        class="list-group-item list-group-item-action"
        v-for="item in searchDataFiltered.slice(0, 50)"
        :to="`/${item.link}`"
      >
        <div class="d-flex flex-lg-row">
          <div class="container p-0">
            <div v-if="item.predicate == 'prefLabel'">
              <div class="container p-0">
                <b v-html="item.label"></b>
              </div>
            </div>
            <div v-else>
              <div class="container p-0" v-html="item.label"></div>
            </div>
          </div>

          <div class="container px-3">
            {{
              item.lang.map((l: string) => $t(`global.lang.${l}`)).join(", ")
            }}
          </div>
          <div class="container p-0">{{ item.samling }}</div>
          <div class="container p-0">{{ item.score }}</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchDataFiltered = useSearchDataFiltered();
</script>

<style>
.searchHighlight {
  background-color: var(--tp-blue-1);
}
</style>
