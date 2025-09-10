<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h2 class="text-3xl font-bold text-gray-900 mb-8">My Orders</h2>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>

    <!-- No Orders State -->
    <div v-else-if="orders.length === 0" class="text-center py-12">
      <div class="mb-6">
        <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h3 class="mt-4 text-xl font-medium text-gray-900">No Orders Yet</h3>
        <p class="mt-2 text-gray-500">Start shopping to create your first order!</p>
      </div>
      <router-link to="/" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
        Go Shopping
      </router-link>
    </div>

    <!-- Orders List -->
    <div v-else>
      <div v-for="order in orders" :key="order._id" class="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <div class="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
          <span class="text-lg font-semibold text-gray-800">Order #{{ order.id }}</span>
          <span class="text-gray-600">{{ new Date(order.createdAt).toLocaleDateString() }}</span>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h5 class="text-xl font-semibold text-gray-900 mb-4">Shipping Details</h5>
              <div class="space-y-2 text-gray-700">
                <p><span class="font-medium">City:</span> {{ order.shippingAddress.city }}</p>
                <p><span class="font-medium">Phone:</span> {{ order.shippingAddress.phone }}</p>
                <p><span class="font-medium">Details:</span> {{ order.shippingAddress.details }}</p>
              </div>
            </div>
            <div>
              <h5 class="text-xl font-semibold text-gray-900 mb-4">Order Summary</h5>
              <div class="space-y-2 text-gray-700">
                <p><span class="font-medium">Payment Method:</span> {{ order.paymentMethodType }}</p>
                <p><span class="font-medium">Shipping:</span> ${{ order.shippingPrice }}</p>
                <p><span class="font-medium">Tax:</span> ${{ order.taxPrice }}</p>
                <p class="text-lg font-bold">Total: ${{ order.totalOrderPrice }}</p>
                <div class="mt-4 flex space-x-3">
                  <span :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  ]">
                    {{ order.isPaid ? 'Paid' : 'Pending Payment' }}
                  </span>
                  <span :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  ]">
                    {{ order.isDelivered ? 'Delivered' : 'Pending Delivery' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8">
            <h5 class="text-xl font-semibold text-gray-900 mb-4">Order Items</h5>
            <div class="space-y-4">
              <div v-for="item in order.cartItems" :key="item._id" 
                   class="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg">
                <img :src="item.product.imageCover" 
                     :alt="item.product.title" 
                     class="w-24 h-24 object-cover rounded-lg">
                <div>
                  <h6 class="text-lg font-medium text-gray-900">{{ item.product.title }}</h6>
                  <p class="text-gray-600">Quantity: {{ item.count }}</p>
                  <p class="text-gray-600">Price: ${{ item.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUserOrders } from '../api/orders';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';

const orders = ref([]);
const loading = ref(true);
const user = JSON.parse(localStorage.getItem('user'));
const router = useRouter();

onMounted(async () => {
    try {
        const res = await getUserOrders();
        orders.value = res.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
    } finally {
        loading.value = false;
    }
});
</script>
