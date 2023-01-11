<template>
  <div>
    <div v-if="$i18n.locale === 'nb'">
      <h2 id="velkommen" class="text-2xl pb-2">
        <NuxtLink to="#velkommen">Velkommen</NuxtLink>
      </h2>
      <p class="pb-1">
        Velkommen til Termportalen ved Språksamlingane – ein nasjonal portal for
        terminologi!
      </p>
      <p>
        Termportalen er ein fritt tilgjengeleg ressurs til norsk terminologi
        innanfor ei lang rekkje fagområde, der det er mogleg å søkja på tvers av
        termbasar og fag.
      </p>
    </div>
    <div v-if="$i18n.locale === 'nn'">
      <h2 id="velkommen" class="text-2xl">
        <NuxtLink to="#velkommen">Velkommen</NuxtLink>
      </h2>
    </div>
    <div v-if="$i18n.locale === 'en'">
      <h2 id="velkommen" class="text-2xl">
        <NuxtLink to="#velkommen">Velkommen</NuxtLink>
      </h2>
    </div>
  </div>
</template>
