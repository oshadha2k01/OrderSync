import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchClients = createAsyncThunk('master/fetchClients', async () => {
    const response = await api.get('/Clients');
    return response.data;
});

export const fetchItems = createAsyncThunk('master/fetchItems', async () => {
    const response = await api.get('/Items');
    return response.data;
});

const masterDataSlice = createSlice({
    name: 'masterData',
    initialState: { clients: [], items: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.fulfilled, (state, action) => { state.clients = action.payload; })
            .addCase(fetchItems.fulfilled, (state, action) => { state.items = action.payload; });
    }
});

export default masterDataSlice.reducer;
