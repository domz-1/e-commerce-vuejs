<script setup lang="ts">
import { onMounted } from 'vue';
import { useCartStore } from './store/cartStore';
const { fetchCart, cartItemsIds } = useCartStore();

onMounted(async () => {
  console.log("b",cartItemsIds.length);
  await fetchCart()
  console.log("a", cartItemsIds.length);
cartItemsIds.push("ak")
})
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>
