import axios from "axios";

export const getPromotions = async (page, page_size) => {
    const value = await axios.get(`/api/v1/promotions?page=${page}&page_size=${page_size}`);
    return value;
}

export const savePromotion = async (data, token) => {
    if (!token) {
        throw new Error('No authentication token found');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    const url = '/api/v1/promotions';
    try {
        const response = await axios.post(url, data, config);
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            throw new Error('Authentication expired');
        }
        throw error;
    }
}