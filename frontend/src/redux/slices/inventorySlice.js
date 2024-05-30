// Src/redux/slices/inventorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	loading: false,
	error: null,
	adding: false,
	updating: false
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
		},
		addProductRequest(state) {
			state.actionInProgress = 'adding';
			state.error = null;
		},
		addProductSuccess(state, action) {
			state.actionInProgress = null;
			state.items.push(action.payload);
		},
		addProductFailure(state, action) {
			state.actionInProgress = null;
			state.error = action.payload;
		},
		updateProductRequest(state) {
			state.actionInProgress = 'updating';
			state.error = null;
		},
		updateProductSuccess(state, action) {
			state.actionInProgress = null;
			const index = state.items.findIndex(item => item._id === action.payload._id);
			if (index !== -1) {
				state.items[index] = action.payload;
			}
		},
		updateProductFailure(state, action) {
			state.actionInProgress = null;
			state.error = action.payload;
		},
		deleteProductRequest(state) {
			state.actionInProgress = 'deleting';
			state.error = null;
		},
		deleteProductSuccess(state, action) {
			state.actionInProgress = null;
			state.items = state.items.filter(item => item._id !== action.payload);
		},
		deleteProductFailure(state, action) {
			state.actionInProgress = null;
			state.error = action.payload;
		}
	}
});

export const {
	fetchItemsRequest,
	fetchItemsSuccess,
	fetchItemsFailure,
	addProductRequest,
	addProductSuccess,
	addProductFailure,
	updateProductRequest,
	updateProductSuccess,
	updateProductFailure,
	deleteProductRequest,
	deleteProductSuccess,
	deleteProductFailure
} = inventorySlice.actions;

export default inventorySlice.reducer;
