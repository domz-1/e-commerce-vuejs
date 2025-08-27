import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
    removeCartItem,
    addProductToCart,
    getCart,
    clearCart,
    updateCartItemCount,
} from '../api/cart';
import { computed } from '@vue/reactivity';

interface CartProduct {
    count: number;
    _id: string;
    product: {
        _id: string;
        title: string;
        imageCover: string;
        category: {
            name: string;
        };
        price: number;
    };
    price: number;
}

interface CartData {
    _id: string;
    cartOwner: string;
    products: CartProduct[];
    totalCartPrice: number;
}

export const useCartStore = defineStore('cart', () => {
    const cartItemsIds = ref<string[]>([]);
    const cartProducts = ref<CartData | null>(null);

    const addToCart = async (productId: string) => {
        const response = await addProductToCart(productId);
        if (response.status === "success") {
            cartItemsIds.value = response.data.products.map((item: CartProduct) => item.product._id);
            cartProducts.value = response.data;
        }
        return response;
    };

    const updateItemCount = async (cartItemId: string, count: number) => {
        const response = await updateCartItemCount(cartItemId, count);
        if (response.status === "success") {
            cartProducts.value = response.data;
            cartItemsIds.value = response.data.products.map(
                (item: CartProduct) => item.product._id
            );
        }
        return response;
    };

    const fetchCart = async () => {
        const response = await getCart();
        if (response.status === "success") {
            cartProducts.value = response.data;
            cartItemsIds.value = response.data.products.map(
                (item: CartProduct) => item.product._id
            );
        }
        return response;
    };

    const removeItem = async (cartItemId: string) => {
        const response = await removeCartItem(cartItemId);
        if (response.status === "success") {
            cartProducts.value = response.data;
            cartItemsIds.value = response.data.products.map(
                (item: CartProduct) => item.product._id
            );
        }
        return response;
    };

    const emptyCart = async () => {
        const response = await clearCart();
        cartProducts.value = null;
        cartItemsIds.value = [];
        return response;
    };


    return {
        addToCart,
        updateItemCount,
        fetchCart,
        removeItem,
        emptyCart,
        cartItemsIds,
        cartProducts,
    };
});
