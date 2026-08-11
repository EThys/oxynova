<template>
  <div>
    <SiteLoader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useOrganizationSchema()
</script>
