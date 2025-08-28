<script setup >
import { ref, onMounted } from 'vue';
import { getAllProducts } from '../api/products';
import ProductCard from './ProductCard.vue';
import { withSkeleton } from '../hocs/withSkeleton';
const products = ref([]);
const loading = ref(true);
const ProductCardS = withSkeleton(ProductCard);
onMounted(async () => {
    const res = await getAllProducts();
    products.value = res.data;
    loading.value = false;
});
</script>
<template>
    <div class="container mx-auto px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <template v-if="loading">
                <div v-for="n in 8" :key="n">
                    <ProductCardS />
                </div>
            </template>
            <template v-else>
                <div v-for="product in products.slice(0, 8)" :key="product.id">
                    <ProductCard :product="product" />
                </div>
            </template>
        </div>
    </div>
</template>
