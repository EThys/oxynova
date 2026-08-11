<template>
  <div>
    <ClientOnly>
      <SiteLoader />
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useOrganizationSchema()
</script>
