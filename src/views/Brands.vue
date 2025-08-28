<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-8">Our Brands</h1>

        <!-- Loader for brands -->
        <div v-if="loadingBrands" class="flex justify-center items-center py-16">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-main border-t-transparent"></div>
        </div>

        <!-- Brands grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="brand in brands" :key="brand._id"
                class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="p-4">
                    <img :src="brand.image" :alt="brand.name" class="w-full h-48 object-contain mb-4" />
                    <h2 class="text-xl font-semibold text-center text-main mb-4">
                        {{ brand.name }}
                    </h2>
                    <button @click="openBrandDetails(brand._id)"
                        class="w-full bg-main text-white py-2 rounded-md hover:bg-main-dark transition-colors duration-300">
                        View Details
                    </button>
                </div>
            </div>
        </div>

        <!-- Brand Details Dialog -->
        <dialog ref="brandDialog" class="brand-dialog">
            <div
                class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto p-6 relative overflow-y-auto max-h-[90vh]">
                <!-- Close button -->
                <button @click="closeBrandDetails"
                    class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl leading-none">
                    &times;
                </button>

                <h3 class="text-2xl font-bold text-main mb-4">Brand Details</h3>

                <!-- Loading brand details -->
                <div v-if="loadingDetails" class="flex justify-center items-center py-12">
                    <div class="animate-spin rounded-full h-10 w-10 border-4 border-main border-t-transparent"></div>
                </div>

                <!-- Brand details content -->
                <div v-else-if="selectedBrand" class="space-y-4">
                    <img :src="selectedBrand.image" :alt="selectedBrand.name" class="w-full h-64 object-contain mb-4" />
                    <div class="space-y-2">
                        <p><span class="font-semibold">Name:</span> {{ selectedBrand.name }}</p>
                        <p><span class="font-semibold">Slug:</span> {{ selectedBrand.slug }}</p>
                        <p>
                            <span class="font-semibold">Created:</span>
                            {{ new Date(selectedBrand.createdAt).toLocaleDateString() }}
                        </p>
                        <p>
                            <span class="font-semibold">Updated:</span>
                            {{ new Date(selectedBrand.updatedAt).toLocaleDateString() }}
                        </p>
                    </div>
                </div>
            </div>
        </dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getBrands, getBrandById } from '../api/brands';

interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

const brands = ref<Brand[]>([]);
const brandDialog = ref<HTMLDialogElement | null>(null);
const selectedBrand = ref<Brand | null>(null);

const loadingBrands = ref(true);
const loadingDetails = ref(false);

const openBrandDetails = async (brandId: string) => {
    try {
        loadingDetails.value = true;
        selectedBrand.value = null;
        brandDialog.value?.showModal();
        const response = await getBrandById(brandId);
        selectedBrand.value = response.data;
    } catch (error) {
        console.error('Error fetching brand details:', error);
    } finally {
        loadingDetails.value = false;
    }
};

const closeBrandDetails = () => {
    brandDialog.value?.close();
    selectedBrand.value = null;
};

onMounted(async () => {
    try {
        const response = await getBrands();
        brands.value = response.data;
    } catch (error) {
        console.error('Error fetching brands:', error);
    } finally {
        loadingBrands.value = false;
    }
});
</script>

<style scoped>
/* Dialog backdrop */
.brand-dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.6);
}

/* Center the dialog nicely */
.brand-dialog {
    border: none;
    padding: 0;
    margin: auto;
    width: 100%;
    max-width: 700px;
    border-radius: 1rem;
}
</style>
  
