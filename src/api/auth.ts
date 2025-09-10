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

export const forgetPassword = async (data: { email: string }) => {
    try {
        const response = await api.post('/auth/forgotPasswords', data);
        if (response.data) {
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
                'Forget password failed. Please try again.',
        };
    }
}
export const verifyResetCode = async (data: { resetCode: string }) => {
    try {
        const response = await api.post('/auth/verifyResetCode', data);
        if (response.data) {
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
                'Reset code verification failed. Please try again.',
        };
    }
}
export const resetPassword = async (data: { email: string; newPassword: string }) => {
    try {
        const response = await api.put('/auth/resetPassword', data);
        if (response.data) {
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
                'Password reset failed. Please try again.',
        };
    }
}
