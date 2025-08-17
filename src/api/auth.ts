import api from "./api";

export const signUp = async (data: any) => {
    try {
        const response = await api.post('/auth/signup', data);
        if (response.data) {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return {
                success: true,
                data: response.data,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Sign up failed. Please try again.',
        };
    }
};

export const signIn = async (data: any) => {
    try {
        const response = await api.post('/auth/signin', data);
        if (response.data) {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return {
                success: true,
                data: response.data
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Sign in failed. Please try again.'
        };
    }
};

export const signOut = ()=>{
    localStorage.removeItem("token")
}