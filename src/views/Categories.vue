<template>
    <div class="p-5">
        <div v-if="loading" class="text-center py-5">
            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-main border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
        <div v-else-if="error" class="text-center py-5 text-red-500">{{ error }}</div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <div v-for="category in categories" :key="category._id"
                class="rounded-lg overflow-hidden shadow-md hover:-translate-y-1 transition-transform duration-200 bg-white">
                <img :src="category.image" :alt="category.name" class="w-full h-[150px] object-cover">
                <h3 class="p-3 m-0 text-center bg-gray-50">{{ category.name }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCategories } from '../api/categories';

const categories = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchCategories = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await getCategories();
    categories.value = res.data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
});
</script>
