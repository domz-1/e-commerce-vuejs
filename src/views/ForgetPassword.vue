<template>
    <main class="container px-4 mx-auto overflow-hidden">
        <section class="md:my-16 my-8">
            <div class="container px-4 mx-auto">
                <div class="justify-evenly md:flex-row flex flex-col items-center">
                    
                    <div class="lg:order-2 md:mb-0 order-1 px-4 mb-10">
                        <div class="mb-6">
                            <h1 class="mb-1 text-3xl font-bold text-gray-700">Forgot Password</h1>
                            <p class="mt-0 mb-2">Enter your email to reset your password</p>
                            <div v-if="errorMessage" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                                {{ errorMessage }}
                            </div>
                            <div v-if="successMessage" class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                                {{ successMessage }}
                            </div>
                        </div>

                        <div v-if="currentStep === 'email'">
                            <Form @submit="handleEmailSubmit" :validation-schema="emailSchemaForVee">
                                <div class="mb-2">
                                    <div class="flex justify-between mb-3">
                                        <label class="text-sm font-medium" for="email">Email</label>
                                        <ErrorMessage name="email" class="text-sm text-red-500" />
                                    </div>
                                    <Field type="email" id="email" name="email" placeholder="Enter your email"
                                        class="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2" />
                                </div>
                                <button type="submit" :disabled="isLoading"
                                    class="hover:bg-young-night focus:ring-main w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-main rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                    {{ isLoading ? 'Sending...' : 'Send Reset Code' }}
                                </button>
                            </Form>
                        </div>

                        <div v-if="currentStep === 'verify'">
                            <Form @submit="handleVerifySubmit" :validation-schema="verifySchemaForVee">
                                <div class="mb-2">
                                    <div class="flex justify-between mb-3">
                                        <label class="text-sm font-medium" for="resetCode">Reset Code</label>
                                        <ErrorMessage name="resetCode" class="text-sm text-red-500" />
                                    </div>
                                    <Field type="text" id="resetCode" name="resetCode" placeholder="Enter reset code"
                                        class="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2" />
                                </div>
                                <button type="submit" :disabled="isLoading"
                                    class="hover:bg-young-night focus:ring-main w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-main rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                    {{ isLoading ? 'Verifying...' : 'Verify Code' }}
                                </button>
                            </Form>
                            <button @click="goBackToEmail"
                                class="w-full px-4 py-2 mt-3 text-center text-gray-600 border border-gray-300 rounded-lg">
                                Back to Email
                            </button>
                        </div>

                        <div v-if="currentStep === 'reset'">
                            <Form @submit="handleResetSubmit" :validation-schema="resetSchemaForVee">
                                <div class="mb-2">
                                    <div class="flex justify-between mb-3">
                                        <label class="text-sm font-medium" for="newPassword">New Password</label>
                                        <ErrorMessage name="newPassword" class="text-sm text-red-500" />
                                    </div>
                                    <div class="relative flex">
                                        <Field :type="showPassword ? 'text' : 'password'" id="newPassword"
                                            name="newPassword" placeholder="Enter new password"
                                            class="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2" />
                                        <span
                                            class="flex items-center justify-around cursor-pointer absolute right-0 top-0 h-full px-3"
                                            @click="togglePasswordVisibility">
                                            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg"
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
                                <button type="submit" :disabled="isLoading"
                                    class="hover:bg-young-night focus:ring-main w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-main rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                    {{ isLoading ? 'Resetting...' : 'Reset Password' }}
                                </button>
                            </Form>
                            <button @click="goBackToVerify"
                                class="w-full px-4 py-2 mt-3 text-center text-gray-600 border border-gray-300 rounded-lg">
                                Back to Verification
                            </button>
                        </div>

                        <p class="mt-5 text-base font-medium">Remember your password?
                            <router-link to="/signin" class="text-main">
                                Sign In
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup>
import { ref, computed } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useRouter } from 'vue-router';
import { forgetPassword, resetPassword, verifyResetCode } from '../api/auth';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const router = useRouter();
const currentStep = ref('email');
const errorMessage = ref('');
const successMessage = ref('');
const showPassword = ref(false);
const userEmail = ref('');
const isLoading = ref(false);
const resetCode = ref('');

// Zod schemas
const emailSchema = z.object({
    email: z.string()
        .min(1, 'Email is required')
        .email('Must be a valid email')
});

const verifySchema = z.object({
    resetCode: z.string().min(1, 'Reset code is required')
});

const resetSchema = z.object({
    newPassword: z.string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters')
});

// Convert Zod schemas to VeeValidate schemas
const emailSchemaForVee = computed(() => toTypedSchema(emailSchema));
const verifySchemaForVee = computed(() => toTypedSchema(verifySchema));
const resetSchemaForVee = computed(() => toTypedSchema(resetSchema));

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const clearMessages = () => {
    errorMessage.value = '';
    successMessage.value = '';
};

const goBackToEmail = () => {
    currentStep.value = 'email';
    clearMessages();
};

const goBackToVerify = () => {
    currentStep.value = 'verify';
    clearMessages();
};

// ✅ Fixed: strict check for successful response
const isSuccessResponse = (response) => {
    return (
        response &&
        (
            response.success === true ||
            response.status === 200 ||
            response.status === 'success' ||
            (response.data && response.data.success === true)
        )
    );
};

// Send email step
const handleEmailSubmit = async (values) => {
    try {
        isLoading.value = true;
        clearMessages();

        console.log('Sending email:', values.email);

        const response = await forgetPassword({ email: values.email });
        console.log('Email response:', response);

        if (isSuccessResponse(response)) {
            userEmail.value = values.email;
            currentStep.value = 'verify';
            successMessage.value = 'Reset code sent to your email!';
        } else {
            errorMessage.value = response?.message || response?.error || 'Failed to send reset code. Please try again.';
        }
    } catch (error) {
        console.error('Email submit error:', error);
        errorMessage.value = error?.response?.data?.message || error?.message || 'An error occurred. Please try again.';
    } finally {
        isLoading.value = false;
    }
};

// Verify code step
const handleVerifySubmit = async (values) => {
    try {
        isLoading.value = true;
        clearMessages();

        console.log('Verifying code:', values.resetCode);

        const response = await verifyResetCode({ resetCode: values.resetCode });
        console.log('Verify response:', response);

        if (isSuccessResponse(response)) {
            resetCode.value = values.resetCode;
            currentStep.value = 'reset';
            successMessage.value = 'Code verified! Please set your new password.';
        } else {
            console.warn('Verification failed:', response);
            errorMessage.value = response?.message || response?.error || 'Invalid reset code. Please try again.';
        }
    } catch (error) {
        console.error('Verify submit error:', error);
        errorMessage.value = error?.response?.data?.message || error?.message || 'An error occurred. Please try again.';
    } finally {
        isLoading.value = false;
    }
};

// Reset password step
const handleResetSubmit = async (values) => {
    try {
        isLoading.value = true;
        clearMessages();

        console.log('Resetting password for:', userEmail.value);

        const response = await resetPassword({
            email: userEmail.value,
            newPassword: values.newPassword,
            resetCode: resetCode.value // If required by API
        });
        console.log('Reset response:', response);

        if (isSuccessResponse(response)) {
            successMessage.value = 'Password reset successfully! Redirecting to sign in...';
            setTimeout(() => {
                router.push('/signin');
            }, 2000);
        } else {
            console.warn('Password reset failed:', response);
            errorMessage.value = response?.message || response?.error || 'Failed to reset password. Please try again.';
        }
    } catch (error) {
        console.error('Reset submit error:', error);
        errorMessage.value = error?.response?.data?.message || error?.message || 'An error occurred. Please try again.';
    } finally {
        isLoading.value = false;
    }
};

// Debug utility for console testing
const debugStepNavigation = () => {
    console.log('Current step:', currentStep.value);
    console.log('User email:', userEmail.value);
    console.log('Reset code:', resetCode.value);
};

// Optional: expose for debugging in browser console
window.debugStepNavigation = debugStepNavigation;
</script>
