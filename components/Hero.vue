<template>
  <div class="relative min-h-[75vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-x-hidden bg-brand-900 font-sans">
    <div class="absolute inset-0 z-0 bg-brand-900">
      <img
        src="/images/about-one.jpg"
        alt="Centrale oxygène médical PSA — OXYNOVA RDC SARL"
        width="1600"
        height="1067"
        fetchpriority="high"
        decoding="sync"
        class="absolute inset-0 w-full h-full object-cover object-center"
      >
      <div class="absolute inset-0 bg-brand-900/55 sm:bg-gradient-to-r sm:from-brand-900/85 sm:via-brand-900/55 sm:to-brand-900/25" />
    </div>

    <div class="relative z-10 container mx-auto px-4 pt-16 sm:pt-20 pb-36 sm:pb-40 md:pb-44">
      <div class="max-w-4xl text-left">
        <h1 class="text-[32px] sm:text-[48px] md:text-[68px] lg:text-[76px] font-[900] text-white mb-6 sm:mb-10 leading-[1] sm:leading-[0.95] tracking-tighter animate-fade-in-up uppercase drop-shadow-lg">
          OXYNOVA<br />
          RDC SARL
        </h1>

        <p class="relative text-[15px] sm:text-[17px] text-white/85 mb-8 sm:mb-14 max-w-xl leading-relaxed animate-fade-in-up delay-200 font-medium drop-shadow min-h-[5.5rem] sm:min-h-[5.25rem]">
          <Transition name="hero-line" mode="out-in">
            <span :key="lineIndex" class="block">{{ heroLines[lineIndex] }}</span>
          </Transition>
        </p>

        <div class="relative z-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-fade-in-up delay-300">
          <a href="#services" class="w-full sm:w-auto text-center px-8 sm:px-12 py-4 sm:py-5 bg-brand-600 text-white font-[900] text-[13px] sm:text-[14px] tracking-[0.1em] hover:bg-brand-700 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(47,125,225,0.5)] transition-all shadow-2xl uppercase rounded-[2px]">
            Nos expertises
          </a>
          <nuxt-link to="/contact" class="w-full sm:w-auto text-center px-8 sm:px-12 py-4 sm:py-5 border-2 border-white/30 text-white font-[900] text-[13px] sm:text-[14px] tracking-[0.1em] hover:bg-white/10 hover:-translate-y-1 transition-all uppercase rounded-[2px]">
            Nous contacter
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const heroLines = [
  'Solutions complètes en ingénierie biomédicale : oxygène médical, équipements, infrastructures hospitalières et maintenance professionnelle.',
  'Nous aussi sommes dans la fourniture, l’installation et la maintenance des équipements biomédicaux.',
  'Nous sommes sur le boulevard du 30 juin, arrêt poste, 5ème niveau, Appartement A2, Kinshasa/Gombe.',
]

const lineIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    lineIndex.value = (lineIndex.value + 1) % heroLines.length
  }, 4200)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.hero-line-enter-active,
.hero-line-leave-active {
  transition: opacity 0.45s ease, transform 0.45s ease;
}
.hero-line-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.hero-line-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
@media (prefers-reduced-motion: reduce) {
  .hero-line-enter-active,
  .hero-line-leave-active {
    transition: none;
  }
  .hero-line-enter-from,
  .hero-line-leave-to {
    transform: none;
  }
}
</style>
