import api from './api';
export const getSubCategories = async () => {
    try {
        const response = await api.get('/subcategories');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getSubCategoryById = async (id: string) => {
    try {
        const response = await api.get(`/subcategories/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getCategories = async () => {
    try {
        const response = await api.get(`/categories`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getCategoryById = async (id: string) => {
    try {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getSubCategoriesByCategoryId = async (id: string) => {
    try {
        const response = await api.get(`/categories/${id}/subcategories`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
