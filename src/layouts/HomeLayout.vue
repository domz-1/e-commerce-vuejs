<template>
    <div>
        <NavHeader />

    </div>
    <div class="bg-[url('/light-patten.svg')] bg-center flex-1 mt-16 min-h-[calc(100vh-64px)]">

        <router-view></router-view>
    </div>
    <div>
        <Footer />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import NavHeader from '../components/NavHeader.vue';
import Footer from '../components/Footer.vue';
const feature = ref();
</script>
<style lang="scss" scoped></style>