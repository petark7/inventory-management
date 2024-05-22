import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TransactionsIcon from '@mui/icons-material/ReceiptLong';
import InventoryIcon from '@mui/icons-material/Inventory';

export const mainListItems = (
	<>
		<ListItemButton>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<InventoryIcon />
			</ListItemIcon>
			<ListItemText primary="Inventory" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<TransactionsIcon />
			</ListItemIcon>
			<ListItemText primary="Transactions" />
		</ListItemButton>
	</>
);
