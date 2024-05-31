// Src/redux/slices/transactionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	transactions: [],
	loading: false,
	error: null
};

const transactionsSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		fetchTransactionsRequest(state) {
			state.loading = true;
		},
		fetchTransactionsSuccess(state, action) {
			state.loading = false;
			state.transactions = action.payload;
		},
		fetchTransactionsFailure(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		addTransactionRequest(state) {
			state.adding = true;
		},
		addTransactionSuccess(state, action) {
			state.adding = false;
			state.transactions.push(action.payload);
		},
		addTransactionFailure(state, action) {
			state.adding = false;
			state.error = action.payload;
		}
	}
});

export const {
	fetchTransactionsRequest,
	fetchTransactionsSuccess,
	fetchTransactionsFailure,
	addTransactionRequest,
	addTransactionSuccess,
	addTransactionFailure
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
