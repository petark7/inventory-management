import {
	FETCH_ITEMS_REQUEST,
	FETCH_ITEMS_SUCCESS,
	FETCH_ITEMS_FAILURE
} from './types';

export const fetchTransactionsRequest = () => ({
	type: FETCH_ITEMS_REQUEST
});

export const fetchTransactionsSuccess = items => ({
	type: FETCH_ITEMS_SUCCESS,
	payload: items
});

export const fetchTransactionsFailure = error => ({
	type: FETCH_ITEMS_FAILURE,
	payload: error
});
