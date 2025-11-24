<template>
  <div class="landing-page">
    <!-- Navbar -->
    <Navbar />
    
    <!-- Ambient Background Elements -->
    <div class="ambient-bg">
      <div class="ambient-orb orb-1"></div>
      <div class="ambient-orb orb-2"></div>
      <div class="ambient-orb orb-3"></div>
    </div>

    <!-- Page Content -->
    <slot />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
// Default layout with Navbar and Footer
</script>

