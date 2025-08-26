<template>
    <div class="m-8 flex flex-col items-center justify-center">
        <h2 class="text-gray-900 text-5xl md:text-6xl font-bold mb-4">Products</h2>
        <ProductsGrid />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductsGrid from '../components/ProductsGrid.vue';

const feature = ref();
</script>

<style lang="scss" scoped></style>