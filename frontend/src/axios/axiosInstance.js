import axios from 'axios';
import config from './config';

const axiosInstance = axios.create({
	baseURL: config.apiBaseUrl,
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRiMGEwYTkxMDM2MTZlM2FlYzBjNmYiLCJpYXQiOjE3MTY0NjA3MjQsImV4cCI6MTcxNjQ2NDMyNH0.CdaiRDLhSPwU3Jo6KGZjuBWhMQ0fl59Px-UdWJGoLwY'
	}
});

export default axiosInstance;
