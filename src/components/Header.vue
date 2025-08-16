<template>
  <header class="sticky top-0 z-40 bg-white">
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
        
      <!-- Left: Logo -->
      <Logo />

      <!-- Middle/Right: Desktop nav + Cart -->
      <div class="hidden md:flex items-center gap-8">
        <NavLinks :links="links" />
      </div>

      <!-- Right: Mobile (cart + hamburger) -->
      <div class="md:hidden flex items-center gap-4">
        <CartIcon :count="cartCount" />
        <HamburgerButton :isOpen="isMenuOpen" @toggle="isMenuOpen = !isMenuOpen" />
      </div>
    </div>

    <!-- Mobile menu (overlays the page) -->
    <MobileMenu :isOpen="isMenuOpen" :links="links" @close="isMenuOpen = false" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Logo from "@/components/header/Logo.vue";
import NavLinks from "@/components/header/NavLinks.vue";
import CartIcon from "@/components/header/CartIcon.vue";
import HamburgerButton from "@/components/header/HamburgerButton.vue";
import MobileMenu from "@/components/header/MobileMenu.vue";


const links = [
    {name: "Home", to: "/"},
    {name: "Shop", to: "/shop"},
    {name: "About", to: "/about"},
    {name: "Contact", to: "/contact"},
    // {name: "Cart", to: "/cart"},
];
const isMenuOpen = ref(true);


const cartCount = computed(() => 0)
</script>

