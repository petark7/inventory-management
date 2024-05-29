// Src/redux/slices/inventorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	loading: false,
	error: null
};

const inventorySlice = createSlice({
	name: 'inventory',
	initialState,
	reducers: {
		fetchItemsRequest(state) {
			state.loading = true;
			state.error = null;
		},
		fetchItemsSuccess(state, action) {
			state.loading = false;
			state.items = action.payload;
		},
		fetchItemsFailure(state, action) {
			state.loading = false;
			state.error = action.payload;
		}
	}
});

export const { fetchItemsRequest, fetchItemsSuccess, fetchItemsFailure } = inventorySlice.actions;

export default inventorySlice.reducer;
