<template>
  <footer
    class="bg-tpblue-400 static left-0 right-0 bottom-0 text-white"
    role="contentinfo"
  >
    <div class="flex items-center justify-center gap-x-6 p-1 md:py-2">
      <nuxt-img
        src="/logo_sprakradet_neg.png"
        sizes="sm:100px md:120px lg:160px xl:180px"
        alt="logo språkrådet"
      />
      <nuxt-img src="/logo_ugle_white.svg" sizes="lg:1vw" alt="logo uib" />
      <div class="text-lg">
        <span>{{ $t("footer.contact") }}: </span><br/>
        <a href="mailto:termportalen@uib.no">termportalen@uib.no</a>
      </div>
    </div>
  </footer>
</template>