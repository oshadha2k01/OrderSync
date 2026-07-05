import { configureStore } from '@reduxjs/toolkit';
import masterDataReducer from './slices/masterDataSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
    reducer: {
        masterData: masterDataReducer,
        orders: orderReducer,
    },
});
