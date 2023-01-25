<template>
  <div>
    <h2 id="domener" class="pb-1 text-2xl">
      <NuxtLink to="#domener">{{
        $t("domainOverview.domainsAndBases")
      }}</NuxtLink>
    </h2>
    <ul class="pl-1">
      <DomainOverviewEntry
        v-for="domain in Object.keys(domainNesting)"
        :key="domain"
        :domain="domain"
      />
    </ul>
  </div>
</template>
