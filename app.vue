<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Initialize theme on app load
if (process.client) {
  const { isDark } = useTheme()
  // Theme is automatically applied by the composable
}
</script>

