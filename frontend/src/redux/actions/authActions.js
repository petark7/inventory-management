// Actions/authActions.js
import {
	LOGIN_REQUEST, REFRESH_TOKEN_REQUEST, APP_LOADED, LOGOUT_REQUEST
} from './types';

export const loginRequest = credentials => ({
	type: LOGIN_REQUEST,
	payload: credentials
});

export const refreshTokenRequest = () => ({
	type: REFRESH_TOKEN_REQUEST
});

export const appLoaded = () => ({
	type: APP_LOADED
});

export const logout = () => ({
	type: LOGOUT_REQUEST
});
