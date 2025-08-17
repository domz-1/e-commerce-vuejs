<template>
    <div>
        <!-- -->
        <div class="lg:gap-5 flex flex-col justify-center w-full h-screen gap-10 mx-auto px-40">
            <div class=""><a href="/"><img src="../../public/freshcart-logo.svg" alt="freshCart-log"></a></div>
            <div class="lg:flex-row lg:items-center flex flex-col items-start justify-between">
                <div>
                    <h1 class="mb-4 text-4xl font-semibold">Something’s wrong here…</h1>
                    <p class="mt-2 mb-8 text-sm font-medium text-gray-500">We can’t find the page you’re looking
                        for.<br>Check out our help center or head back to home.</p>
                    <div class="lg:mb-0 flex gap-5 mb-10">

                            <router-link
                            class="hover:bg-always-green-grass focus:ring-alwbg-always-green-grass sm:w-auto w-full px-[17px] py-[9px] font-semibold text-center text-white transition-all duration-300 bg-always-green-grass rounded-md whitespace-nowrap" to="/">
                            Back to Home
                        </router-link>
                    </div>
                </div>
                <div><img src="../../public/error.svg" alt="error-img"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const feature = ref();
</script>

<style lang="css" scoped></style>