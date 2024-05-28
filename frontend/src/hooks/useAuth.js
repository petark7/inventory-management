import { useSelector } from 'react-redux';

const useAuth = () => {
	const isLoggedIn = useSelector(state => Boolean(state.auth.accessToken));
	return isLoggedIn;
};

export default useAuth;
