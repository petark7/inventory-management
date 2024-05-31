import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = () => {
	const navigate = useNavigate();
	const { accessToken, initialLoad } = useSelector(state => state.auth);

	useEffect(() => {
		if (accessToken && !initialLoad) {
			navigate('/');
		}
	}, [accessToken, initialLoad, navigate]);
};

export default useAuthRedirect;
