import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axiosInstance from '../../axios/apiClient';
import { fetchItemsFailure, fetchItemsRequest, fetchItemsSuccess } from '../slices/inventorySlice';

function * fetchItems() {
	try {
		const response = yield call(axiosInstance.get, '/items');
		yield put(fetchItemsSuccess(response.data));
	} catch (error) {
		yield put(fetchItemsFailure(error.message));
		toast.error('Failed to fetch items');
	}
}

function * watchFetchItems() {
	yield takeEvery(fetchItemsRequest.type, fetchItems);
}

export default watchFetchItems;
