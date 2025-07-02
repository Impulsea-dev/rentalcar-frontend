import axios from "axios";

export const getUsers = async (page = 1, page_size = 20, status = '', role = '', token) => {
    console.log(token);
    

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
  if (status) params.append('status', status);
  if (role) params.append('role', role);

  const url = `/api/v1/users?${params.toString()}`;
  
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Authentication expired');
    }
    throw error;
  }
};
