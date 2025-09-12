<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { storeToRefs } from 'pinia';
const { isAuth } = storeToRefs(useAuthStore());
const { signOut } = useAuthStore();
const { cartItemsIds, fetchCart } = useCartStore();
// Add this to fetch cart when component mounts
onMounted(async () => {
  if (isAuth) {
    await fetchCart();
  }
});
const isMobileMenuOpen = ref(false);
const route = useRoute();
const isActive = (path: string) => {
    if (path === '/') {
        return route.path === '/';
    }
    return route.path.startsWith(path);
};
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>
<template>
    <nav class="bg-white select-none fixed z-30 w-full top-0">
        <div class="max-w-7xl md:px-6 lg:px-8 px-2 mx-auto">
            <div class="relative flex items-center justify-between h-16">
                <div class="md:hidden absolute inset-y-0 left-0 flex items-center gap-2">
                    <div class="inline-flex items-center justify-center p-1.5 rounded-md text-main border-main border cursor-pointer ml-1"
                        @click="toggleMobileMenu">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512"
                            class="w-6 h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z">
                            </path>
                        </svg>
                    </div>
                    <div class="flex items-center flex-shrink-0">
                        <RouterLink to="/">
                            <img class="w-auto h-8" src="../../public/freshcart-logo.svg" alt="F-cart">
                        </RouterLink>
                    </div>
                </div>
                <div
                    class="flex-1 hidden md:flex items-center justify-center md:items-stretch md:justify-start mr-[90px] md:mr-0">
                    <div class="flex items-center flex-shrink-0">
                        <RouterLink to="/">
                            <img class="w-auto h-8" src="../../public/freshcart-logo.svg" alt="fresh-cart">
                        </RouterLink>
                    </div>
                    <div class="md:block md:ml-6 hidden">
                        <div class="flex space-x-2">
                            <li class="flex items-center justify-center">
                                <RouterLink to="/" :class="[
                                    'px-3 py-1.5 rounded-md font-semibold transition-all duration-300',
                                    isActive('/') ? 'bg-main text-white' : 'text-gray-500'
                                ]">Home</RouterLink>
                            </li>
                            <li class="flex items-center justify-center">
                                <RouterLink to="/products" :class="[
                                    'px-3 py-1.5 rounded-md font-semibold transition-all duration-300',
                                    isActive('/products') ? 'bg-main text-white' : 'text-gray-500'
                                ]">Products</RouterLink>
                            </li>
                            <li class="flex items-center justify-center">
                                <RouterLink to="/brands" :class="[
                                    'px-3 py-1.5 rounded-md font-semibold transition-all duration-300',
                                    isActive('/brands') ? 'bg-main text-white' : 'text-gray-500'
                                ]">Brands</RouterLink>
                            </li>
                            <li class="flex items-center justify-center">
                                <RouterLink to="/categories" :class="[
                                    'px-3 py-1.5 rounded-md font-semibold transition-all duration-300',
                                    isActive('/categories') ? 'bg-main text-white' : 'text-gray-500'
                                ]">Categories</RouterLink>
                            </li>
                            <li class="flex items-center justify-center">
                                <RouterLink to="/orders" :class="[
                                    'px-3 py-1.5 rounded-md font-semibold transition-all duration-300',
                                    isActive('/orders') ? 'bg-main text-white' : 'text-gray-500'
                                ]">Orders</RouterLink>
                            </li>
                            <li class="flex items-center justify-center">
                                <RouterLink to="/wishlist" :class="[
                                    'px-3 py-1.5 rounded-md font-semibold transition-all duration-300',
                                    isActive('/wishlist') ? 'bg-main text-white' : 'text-gray-500'
                                ]">Wishlist</RouterLink>
                            </li>
                        </div>
                    </div>
                </div>
                <router-link v-if="isAuth" to="/cart" class="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000"
                        fill="none">
                        <path
                            d="M10.5 20.25C10.5 20.6642 10.1642 21 9.75 21C9.33579 21 9 20.6642 9 20.25C9 19.8358 9.33579 19.5 9.75 19.5C10.1642 19.5 10.5 19.8358 10.5 20.25Z"
                            stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M19 20.25C19 20.6642 18.6642 21 18.25 21C17.8358 21 17.5 20.6642 17.5 20.25C17.5 19.8358 17.8358 19.5 18.25 19.5C18.6642 19.5 19 19.8358 19 20.25Z"
                            stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M2 3H2.20664C3.53124 3 4.19354 3 4.6255 3.40221C5.05746 3.80441 5.10464 4.46503 5.19902 5.78626L5.45035 9.30496C5.5924 11.2936 5.66342 12.2879 5.96476 13.0961C6.62531 14.8677 8.08229 16.2244 9.89648 16.757C10.7241 17 11.7267 17 13.7317 17C15.8373 17 16.89 17 17.7417 16.7416C19.6593 16.1599 21.1599 14.6593 21.7416 12.7417C22 11.89 22 10.8433 22 8.75C22 8.05222 22 7.70333 21.9139 7.41943C21.72 6.78023 21.2198 6.28002 20.5806 6.08612C20.2967 6 19.9478 6 19.25 6H5.5"
                            stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16 10V13M11 10V13" stroke="#141B34" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <p class="absolute -top-2 -left-2 bg-main text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{{ cartItemsIds.length || 0 }}</p>
                </router-link>
                <div v-if="!isAuth"
                    class="md:static md:inset-auto md:ml-6 md:pr-0 absolute inset-y-0 right-0 flex items-center pr-2">
                    <RouterLink
                        class="sm:py-2 sm:px-4 bg-transparent border-2 border-main rounded-lg text-gray-500 sm:text-base hover:bg-main hover:text-white text-sm pb-[5px] pt-1 px-2"
                        to="/signin">Sign In / Sign Up</RouterLink>
                </div>
                <div v-else
                    class="md:static md:inset-auto md:ml-6 md:pr-0 absolute inset-y-0 right-0 flex items-center pr-2"
                    @click="signOut">
                    <p
                        class="sm:py-2 sm:px-4 bg-transparent border-2 border-main rounded-lg text-gray-500 sm:text-base hover:bg-main hover:text-white text-sm pb-[5px] pt-1 px-2">
                        Sign out </p>
                </div>
            </div>
        </div>
        <div class="md:hidden" :class="{ 'hidden': !isMobileMenuOpen }">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <li class="flex items-center justify-start ml-2">
                    <RouterLink to="/" :class="[
                        'px-3 py-1.5 rounded-md font-semibold transition-all duration-300 m-1 text-base',
                        isActive('/') ? 'bg-main text-white' : 'text-gray-500'
                    ]">Home</RouterLink>
                </li>
                <li class="flex items-center justify-start ml-2">
                    <RouterLink to="/products" :class="[
                        'px-3 py-1.5 rounded-md font-semibold transition-all duration-300 m-1 text-base',
                        isActive('/products') ? 'bg-main text-white' : 'text-gray-500'
                    ]">Products</RouterLink>
                </li>
                <li class="flex items-center justify-start ml-2">
                    <RouterLink to="/brands" :class="[
                        'px-3 py-1.5 rounded-md font-semibold transition-all duration-300 m-1 text-base',
                        isActive('/brands') ? 'bg-main text-white' : 'text-gray-500'
                    ]">Brands</RouterLink>
                </li>
                <li class="flex items-center justify-start ml-2">
                    <RouterLink to="/categories" :class="[
                        'px-3 py-1.5 rounded-md font-semibold transition-all duration-300 m-1 text-base',
                        isActive('/categories') ? 'bg-main text-white' : 'text-gray-500'
                    ]">Categories</RouterLink>
                </li>
                <li class="flex items-center justify-start ml-2">
                    <RouterLink to="/orders" :class="[
                        'px-3 py-1.5 rounded-md font-semibold transition-all duration-300 m-1 text-base',
                        isActive('/orders') ? 'bg-main text-white' : 'text-gray-500'
                    ]">Orders</RouterLink>
                </li>
                <li class="flex items-center justify-start ml-2">
                    <RouterLink to="/wishlist" :class="[
                        'px-3 py-1.5 rounded-md font-semibold transition-all duration-300 m-1 text-base',
                        isActive('/wishlist') ? 'bg-main text-white' : 'text-gray-500'
                    ]">Wishlist</RouterLink>
                </li>
            </div>
        </div>
    </nav>
</template>
<style scoped>
.read-the-docs {
    color: #888;
}
</style>