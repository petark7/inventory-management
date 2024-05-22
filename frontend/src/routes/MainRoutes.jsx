import Inventory from '../pages/navigation-menu/Inventory';
import Dashboard from '../pages/navigation-menu/Dashboard';
import Transactions from '../pages/navigation-menu/Transactions';
import NavigationMenu from '../components/NavigationMenu';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: '/',
	element: <NavigationMenu />,
	children: [
		{
			path: 'dashboard',
			element: <Dashboard />
		},
		{
			path: 'inventory',
			element: <Inventory />
		},
		{
			path: 'transactions',
			element: <Transactions />
		}
	]
};

export default MainRoutes;
