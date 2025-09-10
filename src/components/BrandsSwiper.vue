<template>
    <div class="container mx-auto px-4 py-8">

        <!-- Loader for brands -->
        <div v-if="loadingBrands" class="flex justify-center items-center py-16">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-main border-t-transparent"></div>
        </div>

        <!-- Brands Swiper -->
        <div v-else class="w-full">
            <swiper
                :modules="[SwiperAutoplay]"
                :slides-per-view="1"
                :space-between="30"
                :loop="true"
                :autoplay="{
                    delay: 3000,
                    disableOnInteraction: false,
                }"
                :breakpoints="{
                    '640': {
                        slidesPerView: 2,
                    },
                    '768': {
                        slidesPerView: 3,
                    },
                    '1024': {
                        slidesPerView: 9,
                    },
                }"
                class="mySwiper"
            >
                <swiper-slide v-for="brand in brands" :key="brand._id" class="pb-12">
                    <div class="flex flex-col items-center rounded-full">
                        <img 
                            :src="brand.image" 
                            :alt="brand.name" 
                            class="w-full h-20 aspect-square object-contain mb-4 rounded-full"
                        />

                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getBrands } from '../api/brands';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

const brands = ref<Brand[]>([]);
const loadingBrands = ref(true);
const SwiperAutoplay = Autoplay;
const SwiperPagination = Pagination;

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
.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

:deep(.swiper-pagination-bullet-active) {
    background-color: var(--main-color);
}
</style>
