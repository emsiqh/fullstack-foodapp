import { combineReducers } from 'redux';

import userReducer from './userReducer';
import alertReducer from './alertReducer';
import productReducer from './productReducer';
import allUsersReducer from './allUsersReducer';
import cartReducer from './cartReducer';
import displayCartReducer from './displayCartReducer';

const myReducers = combineReducers({
    user: userReducer,
    alert: alertReducer,
    products: productReducer,
    allUsers: allUsersReducer,
    cart: cartReducer,
    isCart: displayCartReducer,
});

export default myReducers;