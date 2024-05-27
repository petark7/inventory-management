import { useState } from 'react';
import {
	Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { toast } from 'react-toastify';
import axiosInstance from '../../axios/apiClient';
import formatDate from '../../utils/formatDate';

const Transactions = () => {
	const [transactions, setTransactions] = useState([]);

	async function fetchTransactions() {
		try {
			const response = await axiosInstance.get('/transactions');
			setTransactions(response.data);
			toast.success('Transactions fetched successfully');
		} catch {
			toast.error('Failed to fetch transactions');
		}
	}

	return (
		<>
			<div>Transactions</div>
			<button onClick={fetchTransactions}>Fetch transactions</button>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>TXID</TableCell>
							<TableCell align="right">Performed by</TableCell>
							<TableCell align="right">Date</TableCell>
							<TableCell align="right">Type</TableCell>
							<TableCell align="right">New quantity</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{transactions.map(row => (
							<TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component="th" scope="row">{row._id}</TableCell>
								<TableCell align="right">{row.createdBy.username}</TableCell>
								<TableCell align="right">{formatDate(row.date)}</TableCell>
								<TableCell align="right">{row.type}</TableCell>
								<TableCell align="right">{row.quantity}</TableCell>
								<TableCell align="right">
									<button onClick={() => console.log(row._id)}>More info</button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Transactions;
