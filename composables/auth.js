import axios from "axios";

export const Login = async (user) => {
    const value = await axios.post(`/api/v1/auth/login`, user);
    return value;
}