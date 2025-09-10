import api from "./api";
const token = localStorage.getItem("token")

export const addProductToCart = async (productId: string) => {
    try {
        const response = await api.post(
            '/cart',
            { productId },
            {
                headers: {
                    token: `${token}`,
                },
            }
        );
        // Store cartOwner (userId) in localStorage if not already present
        if (!localStorage.getItem('cartOwner') && response.data.data.cartOwner) {
            localStorage.setItem('cartOwner', response.data.data.cartOwner);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateCartItemCount = async (
    cartItemId: string,
    count: number
) => {
    try {
        const response = await api.put(
            `/cart/${cartItemId}`,
            { count },
            {
                headers: {
                    token: `${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCart = async () => {
    try {
        const response = await api.get('/cart', {
            headers: {
                'token': `${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const removeCartItem = async (cartItemId: string) => {
    try {
        const response = await api.delete(`/cart/${cartItemId}`, {
            headers: {
                'token': `${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const clearCart = async () => {
    try {
        const response = await api.delete('/cart', {
            headers: {
                'token': `${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
