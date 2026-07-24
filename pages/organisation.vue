<template>
  <div class="bg-white font-sans">
    <header class="relative min-h-[36vh] sm:min-h-[40vh] flex items-center justify-center text-center overflow-hidden bg-brand-900">
      <img src="/images/one.jpg" alt="Organisation OXYNOVA" class="absolute inset-0 w-full h-full object-cover opacity-35">
      <div class="absolute inset-0 bg-brand-900/80" />
      <div class="relative z-10 container mx-auto px-4 py-16">
        <h1 class="text-[36px] sm:text-[56px] font-[900] text-white uppercase tracking-tighter mb-4">Organisation</h1>
        <p class="text-white/70 font-medium max-w-xl mx-auto">
          L'entreprise s'articule autour des principales fonctions suivantes.
        </p>
      </div>
    </header>

    <section class="py-16 sm:py-24 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
          <span class="text-brand-700 font-[900] uppercase tracking-[0.3em] text-[12px] mb-4 block">Structure</span>
          <h2 class="text-[24px] sm:text-[32px] font-[900] text-[#1a1a1b] uppercase tracking-tighter">
            Organigramme
          </h2>
        </div>

        <div class="bg-white border border-gray-100 rounded-[4px] shadow-sm p-4 sm:p-10 lg:p-14">
          <OrgChart />
        </div>
      </div>
    </section>

    <CtaSection />
    <Footer />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Organisation | OXYNOVA RDC SARL' })
</script>
