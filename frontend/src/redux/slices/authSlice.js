import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	accessToken: null,
	isAuthenticated: false,
	user: null,
	error: null,
	initialLoad: true
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginRequest: state => {
			state.error = null;
		},
		loginFailure: (state, action) => {
			state.isAuthenticated = false;
			state.error = action.payload;
			state.initialLoad = false;
		},
		setCredentials: (state, action) => {
			const { user, accessToken } = action.payload;
			state.isAuthenticated = false;
			state.user = user;
			state.accessToken = accessToken;
			state.error = null;
			state.initialLoad = false;
		},
		logout: state => {
			state.isAuthenticated = false;
			state.user = null;
			state.accessToken = null;
			state.error = null;
		}
	}
});

export const {
	loginRequest,
	loginSuccess,
	loginFailure,
	setAccessToken,
	setCredentials,
	logout
} = authSlice.actions;
export default authSlice.reducer;
