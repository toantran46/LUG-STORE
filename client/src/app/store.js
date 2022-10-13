import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { persistStore, persistReducer, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './authSlice';
import adminSlice from '../features/Admin/adminSlice';
import userSlice from '../features/Lug/userSlice';


const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'refreshToken']
}
const userInfoConfig = {
    key: 'userInfo',
    storage,
    whitelist: ['cart']
}

const rootReducers = combineReducers({
    adminInfo: adminSlice,
    auth: persistReducer(authPersistConfig, authSlice),
    userInfo: persistReducer(userInfoConfig, userSlice),
});


const store = configureStore({
    reducer: rootReducers,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),

});

export const persistor = persistStore(store);

export default store;