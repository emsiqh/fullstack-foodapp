import axios from 'axios';

export const baseUrl = 'http://127.0.0.1:5001/fullstack-app-may-18-reactjs/us-central1/app';

export const validateUserJWTToken = async (token) => {
    try {
        const res = await axios.get(`${baseUrl}/api/users/jwtVerify`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data.data;
    } catch (error) {
        return null;
    }
};