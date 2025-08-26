<script setup>
import { ref, onMounted } from 'vue';
import { getAllProducts } from '../api/products';
const products = ref([]);
onMounted(async () => {
    products.value = await getAllProducts().then(res => res.data);
})
import ProductCard from './ProductCard.vue';
</script>
<template>
    <div class="container mx-auto px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="product in products.splice(0,8)" :key="product.id">
                <ProductCard :product="product" />
            </div>
        </div>
    </div>
</template>
<style lang="css" scoped></style>