<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { createCheckout } from '../api/orders';

const router = useRouter();
const route = useRoute();
const cartId = computed(() => route.params.cartId as string);

const formFields = ref([
  {
    id: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: 'Phone Number...'
  },
  {
    id: 'city',
    label: 'City', 
    type: 'text',
    placeholder: 'Write Your City...'
  },
  {
    id: 'address',
    label: 'Details',
    type: 'textarea',
    placeholder: 'Write Your Address Here...'
  }
]);

const onSubmit = async (event: Event) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  
  try {
    
    
    // const currentUrl = window.location.origin;
    await createCheckout(cartId.value, {
      phone: String(formData.get('phone')),
      city: String(formData.get('city')), 
      details: String(formData.get('address'))
    });
    router.push('/orders');
  } catch (error) {
    console.error('Error creating checkout session:', error);
  }
};
</script>

<template>
  <main class="container px-4 mx-auto overflow-hidden">
    <section class="md:my-16 my-8">
      <div class="container px-4 mx-auto">
        <div class="justify-evenly md:flex-row flex flex-col items-center">
          <div class="lg:order-1 order-2 px-4">
            <img src="../../public/signup.svg" alt="signup-img">
          </div>
          <div class="lg:order-2 md:mb-0 order-1 px-4 mb-10">
            <div class="mb-6">
              <h1 class="mb-1 text-3xl font-bold text-gray-700">Get Start Shopping</h1>
              <p class="mt-0 mb-2">Welcome to FreshCart! Enter your details to checkout.</p>
            </div>

            <form @submit="onSubmit">
              <div v-for="field in formFields" :key="field.id" class="mb-2">
                <div class="flex justify-between mb-3">
                  <label class="text-sm font-medium" :for="field.id">{{ field.label }}</label>
                </div>
                <div class="flex">
                  <input v-if="field.type !== 'textarea'" 
                    :type="field.type" 
                    :id="field.id" 
                    :name="field.id"
                    :placeholder="field.placeholder"
                    class="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                  />
                  <textarea v-else
                    :id="field.id"
                    :name="field.id"
                    :placeholder="field.placeholder"
                    cols="30"
                    rows="3"
                    maxlength="200"
                    class="focus:shadow-input-focus focus:outline-none w-full px-4 py-2 font-medium border border-gray-300 border-solid rounded-lg"
                  ></textarea>
                </div>
              </div>

              <button type="submit" 
                class="hover:bg-main focus:ring-main w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-main rounded-lg cursor-pointer">
                Complete Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
