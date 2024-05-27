import {
	call, put, takeEvery, takeLatest
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
	setAccessToken,
	setCredentials,
	loginFailure,
	logout
} from '../slices/authSlice';
import { LOGIN_REQUEST, REFRESH_TOKEN_REQUEST, APP_LOADED } from '../actions/types';
import initApiClient from '../../axios/initApiClient';

let apiClient;

// Saga to handle the app load and fetch the access token
function * handleAppLoad() {
	try {
		apiClient = yield call(initApiClient); // Initialize the apiClient instance
		const response = yield call(apiClient.post.bind(apiClient), '/users/token', {}, { withCredentials: true });
		const { accessToken, user } = response.data;
		yield put(setCredentials({ user, accessToken }));
	} catch (error) {
		if (error.response && error.response.status === 401) {
			// Handle the case where the refresh token is invalid or missing
			yield put(loginFailure(error.message));
			console.warn('No valid refresh token on app load');
		} else {
			console.error('Failed to fetch access token on app load:', error);
		}
	}
}

// Worker saga to handle login
function * handleLogin(action) {
	try {
		const response = yield call(apiClient.post.bind(apiClient), '/users/login', action.payload);
		const { accessToken, user } = response.data;
		yield put(setCredentials({ user, accessToken }));
		toast.success('Login successful.');
	} catch (error) {
		toast.error('Login failed', error);
		yield put(loginFailure(error.message));
	}
}

// Worker saga to handle token refresh
function * handleTokenRefresh() {
	try {
		const response = yield call(apiClient.post.bind(apiClient), '/users/token', {}, { withCredentials: true });
		const { accessToken } = response.data;
		yield put(setAccessToken(accessToken));
		return accessToken;
	} catch (error) {
		yield put(logout());
		toast.error(error.response.statusText);
		throw error;
	}
}

// Watcher saga
function * watchAuth() {
	yield takeEvery(LOGIN_REQUEST, handleLogin);
	yield takeLatest(REFRESH_TOKEN_REQUEST, handleTokenRefresh);
	yield takeLatest(APP_LOADED, handleAppLoad);
}

// Root saga
export default function * rootSaga() {
	yield watchAuth();
}
