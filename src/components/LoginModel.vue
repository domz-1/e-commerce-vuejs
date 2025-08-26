<script setup>
import { ref } from 'vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:isOpen']);

const closeDialog = () => {
    emit('update:isOpen', false);
};
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 bg-opacity-50" @click="closeDialog"></div>

        <!-- Dialog Content -->
        <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-gray-900">Login</h3>

                <button @click="closeDialog" class="text-gray-400 hover:text-gray-500 cursor-pointer">
                    <span class="sr-only">Close</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="space-y-4">
                <!-- Login Form Content Goes Here -->
                <div class="text-start mb-4">
                    <p class="text-gray-600">You must be logged in to perform this action</p>
                </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
                <button @click="closeDialog"
                    class=" cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Cancel
                </button>
                <button class=" cursor-pointer px-4 py-2 bg-main hover:bg-main/90 text-white rounded-md">
                    Login
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>