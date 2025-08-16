<template>
    <router-link to="/">
        <div 
            class="hamburger" 
            @click="emit('toggle')" :aria-expanded="props.isOpen"
            aria-label="Menu" 
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    </router-link>
</template>

<script setup lang="ts">

    const props = defineProps<{ isOpen: boolean }>();
    const emit = defineEmits<{ (e: 'toggle'): void }>();

    const hamburger = document.querySelector<HTMLButtonElement>('.hamburger');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');

        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));
        });
    }
</script>

<style>
    .hamburger {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 20px;
        height: 17px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    .hamburger span {
        display: block;
        height: 3px;
        background-color: #333;
        border-radius: 2px;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }


</style>