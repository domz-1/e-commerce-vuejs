<template>
  <div
    class="min-h-[calc(100vh-64px)] bg-gradient-to-tr from-[#9400D3] to-[#4B0082] overflow-hidden w-full md:flex-row flex flex-col items-center justify-center text-center px-4">
    <img src="../../public/hero.png" width="1000" alt="Shopping Cart"
      class="lg:max-w-full mb-6 md:mb-0 md:mr-8 backdrop-blur-md drop-shadow-2xl  bg-transparent transform lg:translate-y-8">
    <div class="flex flex-col justify-center items-start text-start max-w-2xl lg:-translate-x-20">
      <!-- Small welcome text -->
      <p class="text-sm text-white mb-3 font-light tracking-wide">
        Welcome to Our Store
      </p>
      <!-- Large rotating title -->
      <div class=" inline-flex flex-wrap flex-col items-start transform ">
        <RotatingText :texts="['Premium', 'Quality', 'Modern', 'Stylish']"
          mainClassName="text-5xl md:text-6xl font-bold text-white mb-2 bg-[#4B0082] p-2 inline rounded-md"
          :staggerFrom="last" :initial="{ y: '100%' }" :animate="{ y: 0 }" :exit="{ y: '-120%' }"
          :staggerDuration="0.025" splitLevelClassName="overflow-hidden pb-1"
          :transition="{ type: 'spring', damping: 30, stiffness: 400 }" :rotationInterval="2500" />
        <!-- Static part of title -->
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 text-start">
          Shopping
          <br>
          Experience
        </h1>
      </div>
      <!-- Description text -->
      <p class="text-lg text-white/90 leading-relaxed max-w-xl text-start">
        Discover our curated collection of premium products designed to enhance your
        lifestyle. Shop the latest trends and timeless classics with confidence.
      </p>
    </div>
  </div>
  <div class="container mx-auto px-8 flex flex-col justify-center items-center py-8">
    <h2 class="text-gray-900 text-5xl md:text-6xl font-bold mb-4">Our Brands</h2>
    <BrandsSwiper />
    <h2 class="text-gray-900 text-5xl md:text-6xl font-bold mb-4">Products</h2>
    <ProductsGrid :max="8" />
    <button @click="showMoreProducts"
      class="bg-main hover:bg-main/90 transition-colors px-6 py-3 text-white rounded-lg my-8 font-medium">
      Show More Products
    </button>
  </div>
</template>
<script setup>
import RotatingText from '../components/RotatingText.vue';
import { ref } from 'vue';
import ProductsGrid from '../components/ProductsGrid.vue';
import { useRouter } from 'vue-router';
import BrandsSwiper from '../components/BrandsSwiper.vue';
const router = useRouter();
const feature = ref();
const showMoreProducts = () => {
  router.push('/products');
};
</script>