import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import axiosInstance from '../../axios/apiClient';
import store from '../../redux/store';

const Dashboard = () => {
	const state = store.getState();
	const accessToken = state.auth.accessToken;

	async function fetchData() {
		console.log('access token', accessToken);
		const response = await axiosInstance.get('/items');
		setItems(response.data);
	}

	const [items, setItems] = useState([]);

	console.log(items);
	return (
		<>
			<button onClick={fetchData}>Fetch data</button>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell align="right">Name</TableCell>
							<TableCell align="right">In stock</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map(row => (
							<TableRow
								key={row._id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row._id}
								</TableCell>
								<TableCell align="right">{row.name}</TableCell>
								<TableCell align="right">{row.quantity}</TableCell>
								<TableCell align="right">{row.price}</TableCell>
								<TableCell align="right"><button onClick={() => console.log(row._id)}>Edit</button></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Dashboard;
