<template>
  <div>
    <Head>
      <Title> {{ $t("search.title") }} | {{ $t("index.title") }} </Title>
    </Head>
    <SearchFilter />
    <div class="list-group">
      <SearchResultEntry
        v-for="entry in searchDataFiltered"
        :entryData="entry"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const searchDataFiltered = useSearchDataFiltered();
</script>