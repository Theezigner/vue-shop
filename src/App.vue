<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import DefaultLayout from './layouts/DefaultLayout.vue';
const premium = ref(true) 
</script>

<template>
  <div class="flex flex-col gap-10 text-sm px-5  divide-y divide-gray-300">
    <DefaultLayout />

    <!-- <router-view /> -->
    <div class='flex flex-col gap-10 text-sm p-5 pt-10 divide-y divide-gray-300'>
      <HelloWorld :premium="premium" class="pb-10" product="Product goes here" />
      <HelloWorld :premium="premium"  class="pb-10" product="Product goes here" />
      <HelloWorld :premium="premium"  class="pb-10" product="Product goes here" /><!--this product dont work, cos it has a value in HelloWorld.vue -->

    </div>
  </div>
</template>

<style scoped>

</style>
