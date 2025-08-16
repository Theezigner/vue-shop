<template>
  <!-- The whole menu is wrapped in one transition for fade + slide -->
  <transition name="menufade">
    <!-- Overlay (clicking it closes the menu) -->
    <div
      v-if="props.isOpen"
      class="fixed inset-0 z-50 bg-black/40"
      @click="onOverlayClick"
      aria-hidden="true"
    >
      <!-- PANEL (slides in from the left). role=dialog makes it a modal for a11y -->
      <aside
        class="menu-panel absolute right-0 top-0 h-full w-50 max-w-[85%] bg-white shadow-lg flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <!-- 1) TOP BAR -->
        <div class="flex items-center justify-between h-14 px-4 border-b border-gray-400">
          <div class="text-base font-semibold">Main Menu</div>
          <button
            class="w-10 h-10 grid place-items-center rounded hover:bg-gray-100 focus:outline-none"
            @click="emit('close')"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <!-- 2) MAIN NAV (uses the links prop) -->
        <nav class="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
          <ul class="flex flex-col gap-3">
            <li v-for="link in props.links" :key="link.to">
              <router-link
                :to="link.to"
                class="block py-2 text-lg text-gray-800 hover:underline focus:underline focus:outline-none"
                @click="emit('close')"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- 3) FOOTER ACTIONS (optional shortcuts)
        <div class="px-4 py-3 border-t text-sm text-gray-600 flex items-center gap-4">
        Change or remove these if you don't have routes yet -->
          <!-- <router-link to="/login" class="hover:underline" @click="emit('close')">Login</router-link>
          <router-link to="/help" class="hover:underline" @click="emit('close')">Help</router-link>
          <button class="ml-auto hover:underline" @click="emit('close')">Close</button> -->
        <!-- </div> -->
      </aside>
    </div>
  </transition>
</template>

<script setup lang="ts">
    type Link = {
        name: string;
        to: string
    };
    const props = defineProps<{isOpen: boolean;links: Link[] }>();

    const emit = defineEmits<{ (e: "close"): void }>();

    function onOverlayClick(e: MouseEvent) {
        if (e.target === e.currentTarget) emit("close");
    }
</script>

<style scoped>
/* Fade the overlay */
.menufade-enter-active,
.menufade-leave-active {
  transition: opacity 200ms ease;
}
.menufade-enter-from,
.menufade-leave-to {
  opacity: 0;
}

/* Slide the panel during the same transition */
.menufade-enter-from .menu-panel {
  transform: translateX(100%);
}
.menufade-enter-active .menu-panel {
  transition: transform 220ms ease;
}
.menufade-leave-active .menu-panel {
  transform: translateX(100%);
  transition: transform 220ms ease;
}
</style>