// ApiClient.js
import axios from 'axios';
import store from '../redux/store';
import { refreshTokenRequest } from '../redux/actions/authActions';
import config from './config';

const apiClient = axios.create({
	baseURL: config.apiBaseUrl,
	withCredentials: true
});

// Request interceptor to add access token to headers
apiClient.interceptors.request.use(config => {
	const state = store.getState();
	const accessToken = state.auth.accessToken;
	if (accessToken) {
		config.headers.Authorization = accessToken;
	}

	return config;
}, error => Promise.reject(error));

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;
		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const newAccessToken = await store.dispatch(refreshTokenRequest()).payload;
				apiClient.defaults.headers.common.Authorization = newAccessToken;
				originalRequest.headers.Authorization = newAccessToken;
				return apiClient(originalRequest);
			} catch (refreshError) {
				console.log(refreshError)
				return Promise.reject(refreshError);
			}
		}

		throw error;
	}
);

export default apiClient;
