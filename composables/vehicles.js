import axios from "axios";

export const getVehicles = async (page, page_size, sort, query, brand, type) => {
    const value = await axios.get(`/api/v1/vehicles?page=${page}&page_size=${page_size}&sort=${sort}&query=${query}&brand_id=${brand}&vehicle_type_id=${type}`);
    return value;
}

export const getVehicleById = async (id) => {
    const value = await axios.get(`/api/v1/vehicles/${id}`);
    return value;
}