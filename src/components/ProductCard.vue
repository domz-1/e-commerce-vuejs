<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginModel from './LoginModel.vue';
import { useAuthStore } from '../store/authStore';
const router = useRouter();
const { isAuthenticated } = useAuthStore();
const props = defineProps({
    product: {
        type: Object,
        default: () => ({})
    }
});
const isInCart = ref(false);
const isLiked = ref(false);
const showLoginModal = ref(false);
const toggleCart = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isAuthenticated) {
        showLoginModal.value = true;
        return;
    }
    isInCart.value = !isInCart.value;
};
const toggleLike = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isAuthenticated) {
        showLoginModal.value = true;
        return;
    }
    isLiked.value = !isLiked.value;
};
const showDetails = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/product/${props.product?.id}`);
};
const closeLoginModal = () => {
    showLoginModal.value = false;
};
</script>
<template>
    <div
        class="block border border-gray-200 rounded-lg overflow-hidden transition duration-200 bg-white max-w-[100%] hover:shadow-lg relative h-full">
        <div class="absolute top-2 right-2 z-10 flex gap-2">
            <button @click="toggleLike" class="p-2 rounded-full bg-white shadow-md hover:bg-gray-100">
                <span :class="isLiked ? 'text-red-500' : 'text-gray-400'">❤</span>
            </button>
        </div>
        <div class="w-full h-[150px] overflow-hidden">
            <img :src="product.imageCover" :alt="product.title" class="w-full h-full object-cover" />
        </div>
        <div class="p-3">
            <div class="text-main opacity-90 text-xs font-semibold">{{ product.brand?.name }}</div>
            <h2 class="text-base font-semibold text-gray-800 truncate">{{ product.title }}</h2>
            <div class="text-gray-500 text-xs">{{ product.category?.name }}</div>
            <p class="text-xs text-gray-600 mb-2 line-clamp-2">{{ product.description }}</p>
            <div class="flex justify-between items-center mb-2 text-xs">
                <div class="flex items-center gap-1">
                    <span class="text-main">★</span>
                    {{ product.ratingsAverage }}
                    <span class="text-gray-500">({{ product.ratingsQuantity }})</span>
                </div>
                <div class="text-gray-500">{{ product.sold }} sold</div>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-main text-lg font-bold">${{ product.price }}</span>
                <div class="flex gap-1">
                    <button @click="toggleCart" class="px-3 py-1 text-sm rounded-full transition-colors"
                        :class="isInCart ? 'bg-main text-white' : 'bg-gray-200 text-gray-700'">
                        {{ isInCart ? 'In Cart' : 'Add' }}
                    </button>
                    <button @click="showDetails"
                        class="px-3 py-1 text-sm rounded-full transition-colors bg-gray-400 text-gray-700 cursor-pointer">
                        Details
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Login Modal - only show when user is not authenticated and tries to like/add to cart -->
    <LoginModel v-if="showLoginModal" v-model:isOpen="showLoginModal" />
</template>