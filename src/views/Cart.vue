<script setup>
import { onMounted, ref } from 'vue'
import { useCartStore } from '../store/cartStore'

const cartStore = useCartStore()
const cartData = ref({
    data: {
        products: [],
        totalCartPrice: 0
    },
    numOfCartItems: 0
})

// Loading state
const isLoading = ref(false)

const { fetchCart, emptyCart, removeItem, updateItemCount } = cartStore

// Fetch cart initially
onMounted(async () => {
    isLoading.value = true
    try {
        const res = await fetchCart()
        cartData.value = res
    } finally {
        isLoading.value = false
    }
})

// Clear entire cart
const handleClearCart = async () => {
    isLoading.value = true
    try {
        await emptyCart()
        cartData.value = await fetchCart()
    } finally {
        isLoading.value = false
    }
}

// Remove single item
const handleRemoveItem = async (cartItemId) => {
    isLoading.value = true
    try {
        await removeItem(cartItemId)
        cartData.value = await fetchCart()
    } finally {
        isLoading.value = false
    }
}

// Update item quantity
const handleUpdateCount = async (cartItemId, newCount) => {
    isLoading.value = true
    try {
        if (newCount <= 0) {
            await handleRemoveItem(cartItemId)
        } else {
            await updateItemCount(cartItemId, newCount)
            cartData.value = await fetchCart()
        }
    } finally {
        isLoading.value = false
    }
}
</script>


<template>
    <div class="min-h-screen py-8 relative">
        <!-- Loading overlay -->
        <div v-if="isLoading" class="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
            <svg class="animate-spin h-10 w-10 text-main" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
        </div>

        <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header -->
            <div class="mb-8 flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                    <p class="text-gray-600 mt-2">Review your items before checkout</p>
                </div>
                <button v-if="cartData.data.products?.length > 0" @click="handleClearCart"
                    class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                    Clear Cart
                </button>
            </div>


            <div v-if="cartData.data.products?.length > 0">
                <!-- Cart Items -->
                <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                    <div class="divide-y divide-gray-100">
                        <div v-for="item in cartData.data.products" :key="item._id"
                            class="p-6 hover:bg-gray-50 transition-colors duration-200">
                            <div class="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">

                                <!-- Product Image -->
                                <div class="flex-shrink-0">
                                    <div class="w-24 h-24 lg:w-28 lg:h-28 bg-gray-100 rounded-lg overflow-hidden">
                                        <img :src="item.product.imageCover"
                                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            :alt="item.product.title" />
                                    </div>
                                </div>

                                <!-- Product Details -->
                                <div class="flex-1 min-w-0">
                                    <h3 class="text-lg font-semibold text-gray-900 mb-2 truncate">
                                        {{ item.product.title }}
                                    </h3>
                                    <div
                                        class="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                                        <div class="flex items-center space-x-4 text-sm text-gray-600">
                                            <span
                                                class="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                                                {{ item.price }} EGP
                                            </span>
                                            <span class="text-gray-500">Brand: {{ item.product.brand?.name }}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Quantity Controls -->
                                <div class="flex items-center space-x-3">
                                    <button @click="handleUpdateCount(item.product._id, (item.count + 1))"
                                        class="w-8 h-8 flex items-center justify-center bg-green-100 hover:bg-green-200 text-green-600 rounded-full transition-colors duration-200">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </button>

                                    <span class="w-12 text-center font-medium text-gray-900">{{ item.count }}</span>

                                    <button @click="handleUpdateCount(item.product._id, (item.count - 1))"
                                        class="w-8 h-8 flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors duration-200">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M20 12H4" />
                                        </svg>
                                    </button>
                                </div>

                                <!-- Remove Button -->
                                <div class="flex-shrink-0">
                                    <button @click="handleRemoveItem(item.product._id)"
                                        class="inline-flex items-center px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium rounded-lg transition-colors duration-200 group">
                                        <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cart Summary -->
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900">
                                Total: {{ cartData.data.totalCartPrice }} EGP
                            </h2>
                            <p class="text-sm text-gray-500 mt-1">
                                {{ cartData.numOfCartItems }} item{{ cartData.numOfCartItems !== 1 ? 's' : '' }} in cart
                            </p>
                        </div>
                        <button
                            class="w-full sm:w-auto bg-main hover:bg-main/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform">
                            <div class="flex items-center justify-center space-x-2">
                                <span>Proceed to Checkout</span>
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Empty Cart -->
            <div v-else class="text-center py-16">
                <div class="max-w-md mx-auto">
                    <div class="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Your cart is empty</h3>
                    <p class="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
                    <button
                        class="bg-main hover:bg-main text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                        Start Shopping
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
