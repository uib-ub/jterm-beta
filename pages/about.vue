<template>
  <div class="container">
    <Head>
      <Title>{{ $t("about.title") }} | {{ $t("index.title") }}</Title>
    </Head>
    <h1 class="pb-3 text-3xl">{{ $t("about.title") }}</h1>
    <div class="max-w-3xl space-y-2">
      <p>
        Dette er nettsiden til Termportalen. Siden er fortsatt under utvikling,
        så en del funksjoner er ikke på plass ennå. Arbeidet med å videreutvikle
        og utvide innholdet pågår kontinuerlig, og flere termbaser vil bli gjort
        tilgjengelig for søk etter hvert som de blir importert eller løsning for
        høsting er på plass. I tillegg opprettes det stadig termgrupper som gjør
        at antall domener og mengden terminologi en kan søke i, vil øke jevnt og
        trutt.
      </p>
      <p>
        Kontakt oss gjerne på
        <a class="underline" href="mailto:termportalen@uib.no"
          >termportalen@uib.no</a
        >
        for spørsmål eller tilbakemeldinger.
      </p>
    </div>
  </div>
</template>
