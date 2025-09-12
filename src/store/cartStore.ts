import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import {
    removeCartItem,
    addProductToCart,
    getCart,
    clearCart,
    updateCartItemCount,
} from '../api/cart';

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


export const useCartStore = defineStore('cart', () => {
    const cartItems = ref<CartProduct[] | null>(null);
    const cartItemsIds = reactive<string[]>([]);
    const numCartItems = ref<number>(0);
    const totalCartPrice = ref<number>(0);

    const addToCart = async (productId: string) => {
        const response = await addProductToCart(productId);
        if (response.status === 'success') {
            cartItems.value = response.data.products;
            cartItemsIds.splice(
                0,
                cartItemsIds.length,
                ...response.data.products.map(
                    (item: CartProduct) => item.product._id
                )
            );
            numCartItems.value = response.data.products.reduce(
                (acc: number, item: CartProduct) => acc + item.count,
                0
            );
            totalCartPrice.value = response.data.totalCartPrice;
        }
        return response;
    };

    const updateItemCount = async (cartItemId: string, count: number) => {
        const response = await updateCartItemCount(cartItemId, count);
        if (response.status === 'success') {
            cartItems.value = response.data.products;
            cartItemsIds.splice(0, cartItemsIds.length, ...response.data.products.map(
                (item: CartProduct) => item.product._id
            ));
            numCartItems.value = response.data.products.reduce(
                (acc: number, item: CartProduct) => acc + item.count,
                0
            );
            totalCartPrice.value = response.data.totalCartPrice;
        }
        return response;
    };

    const fetchCart = async () => {
        const response = await getCart();
        if (response.status === 'success') {
            cartItems.value = response.data.products;
            cartItemsIds.splice(0, cartItemsIds.length, ...response.data.products.map(
                (item: CartProduct) => item.product._id
            ));
            numCartItems.value = response.data.numCartItems;
            totalCartPrice.value = response.data.totalCartPrice;
        }
        return response;
    };

    const removeItem = async (cartItemId: string) => {
        const response = await removeCartItem(cartItemId);
        if (response.status === 'success') {
            cartItems.value = response.data.products;
            cartItemsIds.splice(0, cartItemsIds.length, ...response.data.products.map(
                (item: CartProduct) => item.product._id
            ));
            numCartItems.value = response.data.products.reduce(
                (acc: number, item: CartProduct) => acc + item.count,
                0
            );
            totalCartPrice.value = response.data.totalCartPrice;
        }
        return response;
    };

    const emptyCart = async () => {
        const response = await clearCart();
        if (response.status === 'success') {
            cartItems.value = null;
            cartItemsIds.splice(0, cartItemsIds.length);
            numCartItems.value = 0;
            totalCartPrice.value = 0;
        }
        return response;
    };

    // New function: When called, fetches the cart if not already loaded (populating cartItemsIds via the ref),
    // and returns the array of IDs. Call this in your app (e.g., in onMounted or when needed) to ensure the cart is fetched and IDs are available.
    const getCartItemIds = async () => {
        if (cartItems.value === null) {
            await fetchCart();
        }
        return cartItemsIds;
    };

    return {
        addToCart,
        updateItemCount,
        fetchCart,
        removeItem,
        emptyCart,
        cartItemsIds,
        cartItems,
        numCartItems,
        totalCartPrice,
        getCartItemIds,
    };
});
