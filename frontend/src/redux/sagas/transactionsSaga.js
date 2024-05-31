// Src/redux/sagas/transactionsSaga.js
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axiosInstance from '../../axios/apiClient';
import {
	fetchTransactionsRequest,
	fetchTransactionsSuccess,
	fetchTransactionsFailure,
	addTransactionSuccess,
	addTransactionFailure,
	addTransactionRequest
} from '../slices/transactionsSlice';

function * fetchTransactions() {
	try {
		const response = yield call(axiosInstance.get, '/transactions');
		yield put(fetchTransactionsSuccess(response.data));
	} catch (error) {
		yield put(fetchTransactionsFailure(error.message));
		toast.error('Failed to fetch transactions');
	}
}

function * addTransaction(action) {
	try {
		const response = yield call(axiosInstance.post, '/transactions', action.payload);
		yield put(addTransactionSuccess(response.data));
		toast.success('Transaction added successfully');
	} catch (error) {
		yield put(addTransactionFailure(error.message));
		toast.error('Failed to add transaction. Reason: ' + error.message.message);
	}
}

function * watchFetchTransactions() {
	yield takeLatest(fetchTransactionsRequest.type, fetchTransactions);
}

function * watchAddTransaction() {
	yield takeLatest(addTransactionRequest.type, addTransaction);
}

export default function * transactionsSaga() {
	yield all([
		watchFetchTransactions(),
		watchAddTransaction()
	]);
}
