<template>
    <nav aria-label="Main">
        <ul class="flex items-center gap-6">
            <li v-for="link in links">
                <router-link :to="link.to" v-slot="{ isExactActive }" class="px-1 py-2">
                    <span
                        :class="[
                        'hover:underline focus:underline focus:outline-none',
                        isExactActive ? 'text-green-600 font-medium border-b-2 border-green-600' : 'text-gray-700'
                        ]"
                    >
                        {{ link.name }}
                    </span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
    type Link = {
        name: string;
        to: string
    };
    const props = defineProps<{links: Link[] }>();
</script>