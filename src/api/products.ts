import api from "./api";

export const getAllProducts = async () => {
    try {
        const res = await api.get('/products');
        return res.data;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
}

export const getProductById = async (id: number) => {
    try {
        const res = await api.get(`/products/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
    }
}
