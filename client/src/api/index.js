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

// add new product
export const addNewProduct = async (data) => {
    try {
        const res = await axios.post(`${baseUrl}/api/products/create`, { ...data });
        return res.data.data;
    } catch (error) {
        return null;
    }
};

// get all products
export const getAllProducts = async () => {
    try {
        const res = await axios.get(`${baseUrl}/api/products/all`);
        return res.data.data;
    } catch (error) {
        return null;
    }
};

// delete a product
export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/products/delete/${productId}`);
        return response;
    } catch (error) {
        console.error(`Error deleting product ${productId}: ${error}`);
        throw new Error(`Error deleting product ${productId}: ${error}`);
    }
};

// get all users
export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseUrl}/api/users/all`);
        return res.data.data;
    } catch (error) {
        return null;
    }
}