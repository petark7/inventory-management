import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axiosInstance from '../../axios/apiClient';
import {
	fetchItemsFailure,
	fetchItemsRequest,
	fetchItemsSuccess,
	addProductRequest,
	addProductSuccess,
	addProductFailure,
	updateProductSuccess,
	updateProductFailure,
	updateProductRequest,
	deleteProductSuccess,
	deleteProductFailure,
	deleteProductRequest
} from '../slices/inventorySlice';

function * fetchItems() {
	try {
		const response = yield call(axiosInstance.get, '/items');
		yield put(fetchItemsSuccess(response.data));
	} catch (error) {
		yield put(fetchItemsFailure(error.message));
		toast.error('Failed to fetch items');
	}
}

// Add product saga
function * addProduct(action) {
	try {
		const response = yield call(axiosInstance.post, '/items', action.payload);
		yield put(addProductSuccess(response.data));
		toast.success('Product added successfully');
	} catch (error) {
		yield put(addProductFailure(error.message));
		toast.error('Failed to add product');
	}
}

function * updateProduct(action) {
	try {
		const response = yield call(axiosInstance.put, `/items/${action.payload.id}`, action.payload);
		yield put(updateProductSuccess(response.data));
		toast.success('Product updated successfully');
	} catch (error) {
		yield put(updateProductFailure(error.message));
		toast.error('Failed to update product');
	}
}

// Delete product saga
function * deleteProduct(action) {
	try {
		yield call(axiosInstance.delete, `/items/${action.payload}`);
		yield put(deleteProductSuccess(action.payload));
		toast.success('Product deleted successfully');
	} catch (error) {
		yield put(deleteProductFailure(error.message));
		toast.error('Failed to delete product');
	}
}

function * watchInventoryActions() {
	yield takeLatest(fetchItemsRequest.type, fetchItems);
	yield takeLatest(addProductRequest.type, addProduct);
	yield takeLatest(updateProductRequest.type, updateProduct);
	yield takeLatest(deleteProductRequest.type, deleteProduct);
}

export default watchInventoryActions;
