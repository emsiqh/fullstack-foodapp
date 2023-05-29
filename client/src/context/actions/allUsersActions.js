export const setAllUsersDetail = (data) => {
    return {
        type: 'SET_ALL_USERS',
        allUsers: data,
    }
};

export const getAllUsersDetail = () => {
    return {
        type: 'GET_ALL_USERS',
    }
}