import { lazy } from 'react';
import Loadable from '../components/Loadable';

// Render - login
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('../pages/authentication/register')));

const LoginRoutes = {
	path: '/',
	children: [
		{
			path: '/login',
			element: <AuthLogin />
		},
		{
			path: '/register',
			element: <AuthRegister />
		}
	]
};

export default LoginRoutes;
