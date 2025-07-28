import axios from "axios";

export const getVehicles = async (page, page_size, sort, query, brand, type) => {
    const value = await axios.get(`/api/v1/vehicles?page=${page}&page_size=${page_size}&sort=${sort}&query=${query}&brand_id=${brand}&vehicle_type_id=${type}`);
    return value;
}

export const getVehicleById = async (id) => {
    const value = await axios.get(`/api/v1/vehicles/${id}`);
    return value;
}

export const updateVehicleById = async (id, data, token) => {
    if (!token) {
        throw new Error('No authentication token found');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    const url = `/api/v1/vehicles/${id}`;
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

export const searchAvailablesVehicles = async (data ) => {
    const value = await axios.post(`/api/v1/vehicles/availability`, data);
    return value;
}