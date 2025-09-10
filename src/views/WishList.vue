<script setup>
import { getWishlist, removeFromWishlist } from '../api/wishlist';
import { onMounted, ref } from 'vue';
const wishlist = ref([]);
const isLoading = ref(false);
const error = ref(null);

const handleRemoveFromWishlist = async (productId) => {
    try {
        await removeFromWishlist(productId);
        wishlist.value = wishlist.value.filter(item => item._id !== productId);
    } catch (err) {
        error.value = 'Failed to remove item from wishlist';
        console.error('Error removing from wishlist:', err);
    }
};

onMounted(async () => {
    try {
        isLoading.value = true;
        const response = await getWishlist();
        if (response.data?.data) {
            wishlist.value = response.data.data;
        }
    } catch (err) {
        error.value = 'Failed to load wishlist items';
        console.error('Error fetching wishlist:', err);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <h2 class="text-3xl font-bold mb-6 text-gray-800">My Wishlist</h2>
        
        <div v-if="isLoading" class="flex justify-center items-center min-h-[200px]">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-main border-t-transparent"></div>
        </div>

        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {{ error }}
        </div>

        <div v-else-if="wishlist.length === 0" class="text-center text-gray-600 py-8">
            <p class="text-lg">Your wishlist is empty</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="item in wishlist" :key="item._id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div class="aspect-w-16 aspect-h-9 relative">
                    <img 
                        :src="item.imageCover" 
                        class="object-cover w-full h-full"
                        :alt="item.title"
                        @error="$event.target.src='https://via.placeholder.com/300x200?text=Image+Not+Found'"
                    >
                    <button 
                        @click="handleRemoveFromWishlist(item._id)"
                        class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div class="p-4">
                    <h5 class="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">{{ item.title }}</h5>
                    <p class="text-sm text-gray-600 mb-3">
                        Brand: {{ item.brand?.name || 'N/A' }}
                    </p>
                    <div class="flex justify-between items-center">
                        <span class="text-lg font-bold text-main">${{ item.price?.toFixed(2) }}</span>
                        <div class="flex items-center space-x-1">
                            <span class="text-yellow-400">★</span>
                            <span class="text-sm text-gray-700">{{ item.ratingsAverage?.toFixed(1) || 'N/A' }}</span>
                            <span class="text-xs text-gray-500">({{ item.ratingsQuantity || 0 }})</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
