import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import {
    signUp as apiSignUp,
    signIn as apiSignIn,
    signOut as apiSignOut,
} from '../api/auth'; // Adjust the import path as needed
interface User {
    [key: string]: any;
}
interface ApiResponse {
    success: boolean;
    data?: any;
    message?: string;
}
export const useAuthStore = defineStore('authStore', () => {
    // State
    const isAuth = ref(false);
    const user = ref<User>({});
    // Check if token exists on store initialization
    const token = localStorage.getItem('token');
    if (token) {
        isAuth.value = true;
        // You might want to decode the token here to get user info
        // or make an API call to get user data
    }
    // Helper function to set authentication state
    const setAuthState = (token: string, userData: User) => {
        localStorage.setItem('token', token);
        isAuth.value = true;
        user.value = userData;
    };
    // Actions - using your existing API functions
    const signUp = async (data: any): Promise<ApiResponse> => {
        const result = await apiSignUp(data);
        if (result?.success && result?.data) {
            // Extract token and user data from the response
            // Adjust this based on your actual response structure
            const responseData = result.data;
            if (responseData.token) {
                // If user data is available in the response, use it
                // Otherwise, you might need to make another API call to get user info
                const userData = responseData.user || {};
                setAuthState(responseData.token, userData);
            }
        }
        return result || { success: false, message: 'Unknown error occurred' };
    };
    const signIn = async (data: any): Promise<ApiResponse> => {
        const result = await apiSignIn(data);
        if (result?.success && result?.data) {
            // Extract token and user data from the response
            // Adjust this based on your actual response structure
            const responseData = result.data;
            if (responseData.token) {
                // If user data is available in the response, use it
                const userData = responseData.user || {};
                setAuthState(responseData.token, userData);
            }
        }
        return result || { success: false, message: 'Unknown error occurred' };
    };
    const signOut = () => {
        const router = useRouter();
        apiSignOut(); // Call your existing signOut function
        isAuth.value = false;
        user.value = {};
        router.push('/signin');
    };
    // Getters
    const isAuthenticated = computed(() => isAuth.value);
    const currentUser = computed(() => user.value);
    return {
        // State
        isAuth,
        user,
        // Actions
        signUp,
        signIn,
        signOut,
        // Getters
        isAuthenticated,
        currentUser,
    };
});
