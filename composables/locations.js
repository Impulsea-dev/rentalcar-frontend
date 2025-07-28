import axios from "axios";

export const getLocations = async (page, page_size, type) => {
    const value = await axios.get(`/api/v1/locations?page=${page}&page_size=${page_size}&type=${type}`);
    return value;
}

export const saveLocation = async (data, token) => {
    if (!token) {
        throw new Error('No authentication token found');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    const url = '/api/v1/locations';
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

export const getLocationById = async (id) => {
    const value = await axios.get(`/api/v1/locations/${id}`);
    return value;
}

export const updateLocationById = async (id, data, token) => {
    if (!token) {
        throw new Error('No authentication token found');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    const url = `/api/v1/locations/${id}`;
    try {
        const response = await axios.put(url, data, config);
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            throw new Error('Authentication expired');
        }
        throw error;
    }
}