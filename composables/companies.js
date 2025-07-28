import axios from "axios";

export const getCompanyByID = async (id, token) => {
    if (!token) {
        throw new Error('No authentication token found');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };    
    const url = `/api/v1/companies/${id}`;
    try {
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            throw new Error('Authentication expired');
        }
        throw error;
    }    
}


export const getCompanies = async (page, page_size, token) => {
    if (!token) {
        throw new Error('No authentication token found');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (page_size) params.append('page_size', page_size);

    const url = `/api/v1/companies?${params.toString()}`;
    try {
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            throw new Error('Authentication expired');
        }
        throw error;
    }
}