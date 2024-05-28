import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ element }) => {
	const isLoggedIn = useAuth();
	const { initialLoad } = useSelector(state => state.auth);
	const [componentToRender, setComponentToRender] = useState(<div>loading...</div>);

	useEffect(() => {
		if (isLoggedIn) {
			setComponentToRender(element);
		} else if (!isLoggedIn && !initialLoad) {
			setComponentToRender(<Navigate to="/login" />);
		}
	}, [isLoggedIn, initialLoad, element]);

	return componentToRender;
};

export default ProtectedRoute;
