<template>
  <footer class="bg-tpblue-400 static left-0 right-0 bottom-0 text-white">
    <div class="flex flex-wrap items-center justify-center gap-x-6 p-2">
      <nuxt-img
        src="/logo_sprakradet_neg.png"
        width="180px"
        alt="logo språkrådet"
      />
      <nuxt-img src="/logo_ugle_white.svg" width="100px" alt="logo uib" />
      <div class="text-lg">
        <span>{{ $t("footer.contact") }}: </span><br/>
        <a href="mailto:termportalen@uib.no">termportalen@uib.no</a>
      </div>
    </div>
  </footer>
</template>