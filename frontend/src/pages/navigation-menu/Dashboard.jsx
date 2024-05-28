import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axios/apiClient';

const Dashboard = () => {
	const { user } = useSelector(state => state.auth);

	async function fetchData() {
		const response = await axiosInstance.get('/items');
		setItems(response.data);
	}

	const [items, setItems] = useState([]);

	console.log(user);
	return (
		<>
			<button onClick={fetchData}>Fetch data</button>
			<h1>Logged in: {JSON.stringify(user)}</h1>
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
