<template>
  <div class="product flex flex-row gap-5">
    <div class="product-image w-48 h-48 border border-gray-200 rounded-sm overflow-hidden">
      <img :src="image" alt="Product image" class="w-full h-full object-cover" />
    </div>

    <div class="product-info flex flex-col justify-between">
      <div>
        <div class="flex flex-row justify-between">
          <h2 class="text-3xl font-bold">{{ title }}</h2>

          <div class="self-end">
            <p v-if="premium" class="text-yellow-600 font-semibold">Premium</p>
            <p v-else class="text-gray-700 font-semibold">Regular</p>
          </div>
        </div>

        <ul class="text-xs space-y-1">
          <li v-for="(detail, i) in details" :key="i">
            {{ detail.fabric }}, {{ detail.material }}, {{ detail.gender }}
          </li>
        </ul>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="variant in variants"
          :key="variant.variantId"
          @mouseover="updateProduct(variant.variantImage)"
          class="w-5 h-5 rounded-full"
          :style="{ backgroundColor: variant.variantColor }"
          :aria-label="`Variant ${variant.variantColor}`"
        />
      </div>

      <div class="text-sm">
        <p v-if="inventory > 0">{{ inventory }} in Stock</p>
        <p v-show="!inventory" class="line-through">Out Of Stock</p>

        <p v-if="onSale" class="font-semibold text-green-600 pb-1">ON SALE</p>

        <div class="flex items-center gap-2">
          <button
            @click="addToCart"
            :disabled="!inventory"
            class="bg-blue-500 p-1 text-white border rounded
                   enabled:hover:bg-blue-600
                   disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-100
                   disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add to Cart
          </button>

          <p class="p-1 border border-gray-300 rounded hover:bg-green-400 hover:text-white">
            Cart - {{ cart }}
          </p>

          <button
            v-show="cart > 0"
            @click="removeFromCart"
            class="bg-red-500 p-1 text-white border rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type Title = { brand: string; product: string }
type Details = { fabric: string; material: string; gender: string }
type Variant = {
  variantId: number
  variantColor: string
  variantImage: string
  variantQuantity: number
}

export default defineComponent({
  name: 'HelloWorld',

  props: {
    product: { type: String, default: '' },
    premium: { type: Boolean, default: false } // or required: true
  },

  data() {
    const titles: Title = { brand: 'Vue', product: 'Socks' }
    const details: Details[] = [
      { fabric: '80% cotton', material: '20% polyester', gender: 'Gender-neutral' }
    ]
    const variants: Variant[] = [
      { 
        variantId: 2234, 
        variantColor: 'green', 
        variantImage: '/src/assets/vmSocks-green-onWhite.jpg', variantQuantity: 0
      },
      { 
        variantId: 2235, 
        variantColor: 'blue',  
        variantImage: '/src/assets/vmSocks-blue-onWhite.jpg',  variantQuantity: 10 
      }
    ]

    return {
      titles,
      details,
      variants,
      selectedIndex: 0,
      cart: 0,
      onSale: true
    }
  },

  computed: {
    title(): string {
      return `${this.titles.brand} ${this.titles.product}`
    },
    image(): string {
      const v = this.variants[this.selectedIndex]
      return v ? v.variantImage : ''
    },
    inventory(): number {
      const v = this.variants[this.selectedIndex]
      return v ? v.variantQuantity : 0
    }
  },

  methods: {
    addToCart() {
      this.cart++
    },
    removeFromCart() {
      if (this.cart > 0) this.cart--
    },
    updateProduct(variantImage: string) {
      const idx = this.variants.findIndex(v => v.variantImage === variantImage)
      if (idx !== -1) this.selectedIndex = idx
    }
  }
})
</script>

<style scoped>
.read-the-docs { color: #888; }
</style>


