import { combineReducers } from 'redux';

import userReducer from './userReducer';
import alertReducer from './alertReducer';
import productReducer from './productReducer';
import allUsersReducer from './allUsersReducer';

const myReducers = combineReducers({
    user: userReducer,
    alert: alertReducer,
    products: productReducer,
    allUsers: allUsersReducer,
});

export default myReducers;