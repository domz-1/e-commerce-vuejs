<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getProductById } from '../api/products';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const router = useRouter();
const product = ref();
const productId = router.currentRoute.value.params.id;

// Swiper refs
const thumbsSwiper = ref(null);
const mainSwiper = ref(null);

// Swiper modules
const modules = [Navigation, Pagination, Thumbs, FreeMode];

onMounted(async () => {
    product.value = await getProductById(productId).then((res) => {
        return res.data;
    });
});

// Computed property to combine cover image with other images
const allImages = computed(() => {
    if (!product.value) return [];
    const images = [];

    // Add cover image first
    if (product.value.imageCover) {
        images.push(product.value.imageCover);
    }

    // Add other images if they exist and are different from cover
    if (product.value.images) {
        product.value.images.forEach(image => {
            if (image !== product.value.imageCover) {
                images.push(image);
            }
        });
    }

    return images;
});

const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
};

const setMainSwiper = (swiper) => {
    mainSwiper.value = swiper;
};
</script>

<template>
    <div class="container mx-auto p-4 ">
        <div class="grid grid-cols-1 m-10 md:grid-cols-2 gap-8">
            <!-- Product Images with Swiper -->
            <div class="space-y-4">
                <!-- Main Image Swiper -->
                <div class="relative">
                    <Swiper :modules="modules" :thumbs="{ swiper: thumbsSwiper }" :spaceBetween="10" :navigation="true"
                        :pagination="{ clickable: true }" class="main-swiper rounded-lg shadow-lg"
                        @swiper="setMainSwiper">
                        <SwiperSlide v-for="(image, index) in allImages" :key="index"
                            class="flex items-center justify-center bg-gray-100">
                            <img :src="image" :alt="`${product?.title} - Image ${index + 1}`"
                                class="w-full h-96 object-cover rounded-lg">
                        </SwiperSlide>
                    </Swiper>
                </div>

                <!-- Thumbnail Swiper -->
                <div v-if="allImages.length > 1">
                    <Swiper :modules="modules" :spaceBetween="10" :slidesPerView="4" :freeMode="true"
                        :watchSlidesProgress="true" class="thumbs-swiper" @swiper="setThumbsSwiper" :breakpoints="{
                            320: {
                                slidesPerView: 3,
                                spaceBetween: 8,
                            },
                            640: {
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 12,
                            },
                        }">
                        <SwiperSlide v-for="(image, index) in allImages" :key="index" class="cursor-pointer">
                            <img :src="image" :alt="`${product?.title} - Thumbnail ${index + 1}`"
                                class="w-full h-20 object-cover rounded border-2 border-transparent hover:border-main transition-all duration-300">
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>

            <!-- Product Details -->
            <div class="space-y-4">
                <h1 class="text-3xl font-bold text-main">{{ product?.title }}</h1>
                <p class="text-gray-600">{{ product?.description }}</p>

                <div class="flex items-center space-x-4">
                    <span class="text-2xl font-bold text-main">${{ product?.price }}</span>
                    <div class="flex items-center">
                        <span class="text-yellow-400">★</span>
                        <span class="ml-1">{{ product?.ratingsAverage }} ({{ product?.ratingsQuantity }} reviews)</span>
                    </div>
                </div>

                <div class="space-y-2">
                    <p><span class="font-semibold">Brand:</span> {{ product?.brand?.name }}</p>
                    <p><span class="font-semibold">Category:</span> {{ product?.category?.name }}</p>
                    <p><span class="font-semibold">Subcategory:</span> {{ product?.subcategory[0]?.name }}</p>
                    <p><span class="font-semibold">Available Quantity:</span> {{ product?.quantity }}</p>
                    <p><span class="font-semibold">Sold:</span> {{ product?.sold }}</p>
                </div>

                <button class="bg-main text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Custom styles for Swiper */
.main-swiper {
    height: 400px;
}

.thumbs-swiper {
    height: 80px;
    margin-top: 10px;
}

/* Custom navigation buttons */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
    color: #8440a8;
    /* Replace with your main color */
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-top: -20px;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
    font-size: 16px;
}

/* Custom pagination */
:deep(.swiper-pagination-bullet) {
    background: #8440a8;
    /* Replace with your main color */
    opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
    opacity: 1;
}

/* Thumbnail active state */
:deep(.swiper-slide-thumb-active img) {
    border-color: #8440a8 !important;
    /* Replace with your main color */
}

/* Hover effects */
.thumbs-swiper :deep(.swiper-slide) {
    transition: all 0.3s ease;
}


</style>