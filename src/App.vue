<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
// defineProps<{ myDogg: string }>()
let myDogg = "Material gurl"
</script>

<template>
  <div class="nav-bar"></div>

  <div class='text-sm p-5 pt-10'>
    <HelloWorld product="Product goes here" /><!--this product dont work, cos it has a value in HelloWorld.vue -->

    <!-- <h3>{{ myDogg }}</h3> -->
  </div>
</template>

<style scoped>

</style>
