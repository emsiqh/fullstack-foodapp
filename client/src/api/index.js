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
        const allItems = res.data.data;
        allItems.sort((a, b) => a.product_name
            .localeCompare(b.product_name
            ));
        console.log(allItems);
        return allItems;
    } catch (error) {
        console.error("Failed to get products:", error);
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
};

// add new item to the cart
export const addNewItemToCart = async (userId, data) => {
    try {
        const res = await axios.post(`${baseUrl}/api/products/addToCart/${userId}`, { ...data });
        return res.data.data;
    } catch (err) {
        throw new Error(`Failed to add item to cart: ${err.message}`);
    }
};

// get all items in the cart of the user
export const getAllCartItems = async (user_id) => {
    try {
        const res = await axios.get(`${baseUrl}/api/products/getCartItems/${user_id}`);
        const cartItems = res.data.data;
        cartItems.sort((a, b) => a.product_name
            .localeCompare(b.product_name
            ));
        return cartItems;
    } catch (err) {
        throw new Error(`Failed to get items: ${err.message}`);
    }
};

// cart increment
export const increaseItemQuantity = async (user_id, productId, type) => {
    console.log(user_id, productId, type);
    try {
        const res = await axios.post(`${baseUrl}/api/products/updateCart/${user_id}`, null, { params: { productId: productId, type: type } });
        return res.data.data;
    } catch (error) {
        return null;
    }
};

// empty the cart
export const emptyCart = async (user_id) => {
    try {
        const res = await axios.delete(`${baseUrl}/api/products/emptyCart/${user_id}`);
        return res;
    } catch (error) {
        throw new Error(`Failed to empty the cart: ${error.message}`);
    }
}