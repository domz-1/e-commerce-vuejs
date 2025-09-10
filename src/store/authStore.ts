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
    const isAuth = ref(false);
    const user = ref<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    const token = ref(localStorage.getItem('token'));
    const router = useRouter();

    if (token.value) {
        isAuth.value = true;
    }

    const setAuthState = (resToken: string, userData: User) => {
        localStorage.setItem('token', resToken);
        localStorage.setItem('user', JSON.stringify(userData));
        token.value = resToken;
        isAuth.value = true;
        user.value = userData;
    };

    const signUp = async (data: any): Promise<ApiResponse> => {
        const result = await apiSignUp(data);
        if (result?.success) {
            const responseData = result.data;
            if (responseData.token) {
                const userData = responseData.user || {};
                setAuthState(responseData.token, userData);
            }
        }
        return result || { success: false, message: 'Unknown error occurred' };
    };

    const signIn = async (data: any): Promise<ApiResponse> => {
        const result = await apiSignIn(data);

        if (result?.success && result?.data) {
            const responseData = result.data;
            if (responseData.token) {
                const userData = responseData.user || {};
                setAuthState(responseData.token, userData);
            }
        }
        return result || { success: false, message: 'Unknown error occurred' };
    };

    const signOut = () => {
        apiSignOut();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        isAuth.value = false;
        user.value = {};
        token.value = "";
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
        token
    };
});
