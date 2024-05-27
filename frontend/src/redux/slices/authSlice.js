import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	accessToken: null,
	isAuthenticated: false,
	user: null,
	error: null
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
	  loginRequest: state => {
			state.error = null;
	  },
	  loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.accessToken = action.payload.accessToken;
			state.error = null;
	  },
	  loginFailure: (state, action) => {
			state.isAuthenticated = false;
			state.error = action.payload;
	  },
	  setAccessToken: (state, action) => {
			state.accessToken = action.payload;
	  },
	  setCredentials: (state, action) => {
			const { user, accessToken } = action.payload;
			state.user = user;
			state.accessToken = accessToken;
	  },
	  logout: state => {
			state.isAuthenticated = false;
			state.user = null;
			state.accessToken = null;
			state.error = null;
	  }
	}
});

export const { loginRequest, loginSuccess, loginFailure, setAccessToken, setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
