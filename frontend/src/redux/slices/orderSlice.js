import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await api.get('/SalesOrders');
    return response.data;
});

export const saveOrder = createAsyncThunk('orders/saveOrder', async (orderData) => {
    const response = await api.post('/SalesOrders', orderData);
    return response.data;
});

const orderSlice = createSlice({
    name: 'orders',
    initialState: { list: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled, (state, action) => { state.list = action.payload; });
    }
});

export default orderSlice.reducer;
