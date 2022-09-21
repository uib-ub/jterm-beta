<template>
  <div class="container py-2 p-0">
    <!--Filter-->
    <div class="d-flex justify-content-betweem align-items-center">
      <div class="container py-0">
        {{ searchData.length }} {{ $t("searchFilter.results") }}
      </div>
      <button
        class="btn tp-filter-btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#filterCard"
        aria-expanded="false"
        aria-controls="filterCard"
      >
        Filter
      </button>
    </div>
    <div class="collapse" id="filterCard">
      <div class="card card-body">
        <div class="row row-cols-4">
          <div class="col" style="width: 300px">Languages</div>
          <div class="col" style="width: 300px">Samling</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchData = useSearchData();
</script>

<style>
.tp-filter-btn {
  border: none;
  width: 115px;
  height: 40px;
  color: var(--tp-dark);
  background-color: var(--tp-light);
}
</style>
