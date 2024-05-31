import {
	FETCH_TRANSACTIONS_REQUEST,
	FETCH_TRANSACTIONS_SUCCESS,
	FETCH_TRANSACTIONS_FAILURE
} from './types';

export const fetchTransactionsRequest = () => ({
	type: FETCH_TRANSACTIONS_REQUEST
});

export const fetchTransactionsSuccess = items => ({
	type: FETCH_TRANSACTIONS_SUCCESS,
	payload: items
});

export const fetchTransactionsFailure = error => ({
	type: FETCH_TRANSACTIONS_FAILURE,
	payload: error
});
