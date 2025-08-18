<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { signOut } from '../api/auth';
// Reactive state for mobile menu visibility
const isMobileMenuOpen = ref(false);
const isLoggedIn = ref(localStorage.getItem("token"));

// Get current route
const route = useRoute();

// Function to determine if a link is active based on the current URL
const isActive = (path: string) => {
    if (path === '/') {
        return route.path === '/';
    }
    return route.path.startsWith(path);
};

// Toggle mobile menu
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
                        </div>
                    </div>
                </div>
                <div v-if="!isLoggedIn" class="md:static md:inset-auto md:ml-6 md:pr-0 absolute inset-y-0 right-0 flex items-center pr-2">
                    <RouterLink
                        class="sm:py-2 sm:px-4 bg-transparent border-2 border-main rounded-lg text-gray-500 sm:text-base hover:bg-main hover:text-white text-sm pb-[5px] pt-1 px-2"
                        to="/signin">Sign In / Sign Up</RouterLink>
                </div>
                <div v-else class="md:static md:inset-auto md:ml-6 md:pr-0 absolute inset-y-0 right-0 flex items-center pr-2" @click="signOut">
                    <RouterLink
                        class="sm:py-2 sm:px-4 bg-transparent border-2 border-main rounded-lg text-gray-500 sm:text-base hover:bg-main hover:text-white text-sm pb-[5px] pt-1 px-2"
                        to="/signin">Sign out </RouterLink>
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
            </div>
        </div>
    </nav>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>