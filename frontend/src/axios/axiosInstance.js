import axios from 'axios';
import config from './config';

const axiosInstance = axios.create({
	baseURL: config.apiBaseUrl,
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRiMGEwYTkxMDM2MTZlM2FlYzBjNmYiLCJpYXQiOjE3MTYzOTk5OTYsImV4cCI6MTcxNjQwMzU5Nn0.N7ixeyhzj6lIcKYasE9gCUy3rGEePRErAKkTp-4Jzmo'
	}
});

export default axiosInstance;
