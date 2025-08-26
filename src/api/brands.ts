import api from './api';

export const getBrands = async () => {
    try {
        const response = await api.get('/brands');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBrandById = async (id: string) => {
    try {
        const response = await api.get(`/brands/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
