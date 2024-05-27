// InitApiClient.js
import axios from 'axios';
import config from '../axios/config';

const initApiClient = () => {
	const apiClient = axios.create({
		baseURL: config.apiBaseUrl,
		withCredentials: true
	});

	return apiClient;
};

export default initApiClient;
