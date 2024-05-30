import Inventory from '../pages/navigation-menu/Inventory/Inventory';
import Dashboard from '../pages/navigation-menu/Dashboard';
import Transactions from '../pages/navigation-menu/Transactions';
import NavigationMenu from '../components/NavigationMenu';
import ProtectedRoute from './ProtectedRoute';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: '/',
	element: <ProtectedRoute
		element={<NavigationMenu />}
	/>,
	children: [
		{
			path: '/',
			element: <ProtectedRoute
				element={<Dashboard />}
			/>
		},
		{
			path: '/dashboard',
			element: <ProtectedRoute
				element={<Dashboard />}
			/>
		},
		{
			path: 'inventory',
			element: <ProtectedRoute
				element={<Inventory />}
			/>
		},
		{
			path: 'transactions',
			element: <ProtectedRoute
				element={<Transactions />} />
		}
	]
};

export default MainRoutes;
