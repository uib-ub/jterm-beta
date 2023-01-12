z
<template>
  <div>
    <h2 id="domener" class="text-2xl pb-1">
      <NuxtLink to="#domener">{{ $t("domainOverview.domainsAndBases") }}</NuxtLink>
    </h2>
    <ul class="pl-1">
      <DomainOverviewEntry domain="humaniora"></DomainOverviewEntry>
      <DomainOverviewEntry domain="naturvitenskap"></DomainOverviewEntry>
      <DomainOverviewEntry domain="sammfunnsfag"></DomainOverviewEntry>
      <DomainOverviewEntry domain="okonomAdmin"></DomainOverviewEntry>
    </ul>
  </div>
</template>
