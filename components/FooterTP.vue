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
        <a href="mailto:termportalen@uib.no" class="group block">
          <span>{{ $t("footer.contact") }}: </span><br />
          <span class="group-hover:underline">termportalen@uib.no</span></a
        >
      </div>
    </div>
  </footer>
</template>
