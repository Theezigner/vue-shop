<script setup lang="ts">
import { ref, computed } from "vue";

// const count = ref(0)
let product = "Socks";
// let image = '/src/assets/vmSocks-green-onWhite.jpg'

let inventory = 10;
let onSale = true;

type Details = {
  fabric: string;
  material: string;
  gender: string;
};

let details = ref<Details[]>([
  {
    fabric: "80% cotton",
    material: "20% polyester",
    gender: "Gender-neutral",
  },
]);

type Variants = {
  variantId: number;
  variantColor: string;
  variantImage: string;
};

let variants: Variants[] = [
  {
    variantId: 2234,
    variantColor: "green",
    variantImage: "/src/assets/vmSocks-green-onWhite.jpg",
  },
  {
    variantId: 2235,
    variantColor: "blue",
    variantImage: "/src/assets/vmSocks-blue-onWhite.jpg",
  },
];

// which variant is active
const selectedIndex = ref(0);

// derive the shown image from the selected variant
const image = computed(() => variants[selectedIndex.value].variantImage);

let cart = ref(0);

const addToCart = () => {
  cart.value++;
};

const removeFromCart = () => {
  cart.value--;
};

const updateProduct = (variantImage: string) => {
  const index = variants.findIndex(
    (variant) => variant.variantImage === variantImage
  );
  if (index !== -1) selectedIndex.value = index;
};
</script>

<template>
  <div class="product flex flex-row gap-5">
    <div class="product-image w-50 h-50 border-1 border-gray-200 rounded-sm">
      <img :src="image" /><!--(:) means v-bind-->
    </div>

    <div class="product-info flex flex-col justify-between">
      <div>
        <h2 class="text-3xl font-bold">{{ product }}</h2>

        <ul class="text-xs">
          <li v-for="detail in details">
            {{ detail.fabric }}, {{ detail.material }}, {{ detail.gender }}
          </li>
        </ul>
      </div>

      <div class="flex flex-wrap gap-2">
        <p
          @mouseover="updateProduct(variant.variantImage)"
          v-for="variant in variants"
          :key="variant.variantId"
          class="w-5 h-5 rounded"
          :style="{ backgroundColor: variant.variantColor }"
        ></p>
      </div>

      <div class="text-sm bottom-0">
        <p v-if="inventory > 0">{{ inventory }} {{ product }} in Stock</p>
        <!-- <p v-else-if="inventory < 10 && inventory > 0">{{ inventory }} {{ product }} in Stock</p> -->
        <p 
          v-show="!inventory"
          class="text-decoration:line-through"
        >
          Out Of Stock
        </p>

        <p v-if="onSale" class="font-semibold text-green-600 pb-1">ON SALE</p>
        <div class="flex items-center gap-2">
          <button
            v-on:click="addToCart"
            class="bg-blue-500 p-1 text-white border rounded disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-100 
            disabled:cursor-not-allowed disabled:opacity-40 "
            :disabled="!inventory"
          >
            Add to Cart
          </button>

          <p
            class="p-1 border border-gray-300 rounded hover:bg-green-400 hover:text-white"
          >
            Cart - {{ cart }}
          </p>

          <button
            class="bg-red-500 p-1 text-white border rounded"
            v-show="cart > 0"
            v-on:click="removeFromCart"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div> -->
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
