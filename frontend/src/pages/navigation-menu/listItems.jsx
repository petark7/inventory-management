import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TransactionsIcon from '@mui/icons-material/ReceiptLong';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link } from 'react-router-dom';

export const mainListItems = (
	<>
		<Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
			<ListItemButton>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItemButton>
		</Link>

		<Link to="/inventory" style={{ textDecoration: 'none', color: 'inherit' }}>
			<ListItemButton>
				<ListItemIcon>
					<InventoryIcon />
				</ListItemIcon>
				<ListItemText primary="Inventory" />
			</ListItemButton>
		</Link>

		<Link to="/transactions" style={{ textDecoration: 'none', color: 'inherit' }}>
			<ListItemButton>
				<ListItemIcon>
					<TransactionsIcon />
				</ListItemIcon>
				<ListItemText primary="Transactions" />
			</ListItemButton>
		</Link>
	</>
);
