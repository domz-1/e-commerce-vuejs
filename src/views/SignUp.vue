<template>
    <main class="container px-4 mx-auto overflow-hidden">
        <section class="md:my-16 my-8">
            <div class="container px-4 mx-auto">
                <div class="justify-evenly md:flex-row flex flex-col items-center">
                    <div class="lg:order-1 order-2 px-4"><img src="../../public/signup.svg" alt="signup-img">
                    </div>
                    <div class="lg:order-2 md:mb-0 order-1 px-4 mb-10">
                        <div class="mb-6">
                            <h1 class="mb-1 text-3xl font-bold text-gray-700">Get Start Shopping</h1>
                            <p class="mt-0 mb-2">Welcome to FreshCart! Enter your email to get started.</p>
                            <div v-if="errorMessage" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                                {{ errorMessage }}
                            </div>
                        </div>
                        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                            <div v-for="field in formFields" :key="field.id" class="mb-2">
                                <div class="flex justify-between mb-3">
                                    <label class="text-sm font-medium" :for="field.id">{{ field.label }}</label>
                                    <span v-if="errors[field.id]" class="text-sm text-red-500">{{ errors[field.id]
                                        }}</span>
                                </div>
                                <div :class="{ 'relative flex': field.type === 'password' }">
                                    <Field :type="getFieldType(field)" :id="field.id" :name="field.id"
                                        :placeholder="field.placeholder"
                                        class="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                                        :class="{ 'border-red-500': errors[field.id] }" />
                                    <span v-if="field.type === 'password'"
                                        class="flex items-center justify-around cursor-pointer absolute right-0 top-0 h-full px-3"
                                        @click="togglePasswordVisibility(field.id)">
                                        <svg v-if="showPassword[field.id]" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <path
                                                d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                                                stroke="currentColor" stroke-width="1.5"></path>
                                            <path
                                                d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                                                stroke="currentColor" stroke-width="1.5"></path>
                                        </svg>
                                        <svg v-else stroke="currentColor" fill="none" stroke-width="2"
                                            viewBox="0 0 24 24" aria-hidden="true" height="25" width="25"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <button type="submit" :disabled="isSubmitting"
                                class="hover:bg-main focus:ring-main disabled:opacity-65 disabled:cursor-not-allowed w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-main rounded-lg cursor-pointer">
                                Sign Up
                            </button>
                            <p class="mt-5 text-base font-medium">You have an account? <router-link class="text-main"
                                    to="/signin">
                                    Sign in
                                </router-link></p>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup>
import { ref } from 'vue';
import { Form, Field } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import { signUpSchema } from '../schemas/signUpSchema';
const router = useRouter();
const {
    isAuth,
    user,

    // Actions
    signUp,
    signIn,
    signOut,

    // Getters
    isAuthenticated,
    currentUser, } = useAuthStore();
const errorMessage = ref('');
const showPassword = ref({
    password: false,
    rePassword: false,
});
const formFields = ref([
    {
        id: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Name',
    },
    {
        id: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Email',
    },
    {
        id: 'phone',
        label: 'Phone',
        type: 'tel',
        placeholder: 'Phone',
    },
    {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: '******',
    },
    {
        id: 'rePassword',
        label: 'Renter Password',
        type: 'password',
        placeholder: '******',
    }
]);
const getFieldType = (field) => {
    if (field.type === 'password') {
        return showPassword.value[field.id] ? 'text' : 'password';
    }
    return field.type;
};
const togglePasswordVisibility = (fieldId) => {
    showPassword.value[fieldId] = !showPassword.value[fieldId];
};
const onSubmit = async (values, { setSubmitting }) => {
    errorMessage.value = '';
    const res = await signUp(values);
    console.log(res);
    if (res.success) {
        router.push('/');
    } else {
        errorMessage.value = res.message;
    }
    setSubmitting(false);
};
const schema = signUpSchema;
</script>