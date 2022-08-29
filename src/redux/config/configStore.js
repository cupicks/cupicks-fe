import { configureStore } from '@reduxjs/toolkit';
import users from '../modules/users';

const store = configureStore({
    reducer: {
        users,
    }
})

export default store;