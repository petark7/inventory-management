import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Menu, MenuItem,
	Chip
} from '@mui/material';
import { fetchTransactionsRequest } from '../../../redux/slices/transactionsSlice';
import Loading from '../../../components/Loading';
import { Button } from '../../../components/layout/Button';
import formatDate from '../../../utils/formatDate';
import Modal from '../../../components/Modal';
import AddTransaction from './AddTransaction';

const Transactions = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const dispatch = useDispatch();
	const { transactions, loading } = useSelector(state => state.transactions);

	useEffect(() => {
		dispatch(fetchTransactionsRequest());
	}, [dispatch]);

	return (
		<>
			<Box>
				<Button
					sx={{ marginBottom: '10px' }}
					type="button"
					onClick={handleOpen}
				>
					Add a transaction
				</Button>

				<Modal open={open} onClose={handleClose}>
					<AddTransaction onSuccess={handleClose} />
				</Modal>

			</Box>
			<Loading isLoading={loading}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>TXID</TableCell>
								<TableCell align="right">Performed by</TableCell>
								<TableCell align="right">Date</TableCell>
								<TableCell align="right">Product</TableCell>
								<TableCell align="right">Type</TableCell>
								<TableCell align="right">Old Quantity</TableCell>
								<TableCell align="right">New quantity</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{transactions.map(row => (
								<TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component="th" scope="row">{row._id}</TableCell>
									<TableCell align="right">{row.createdBy.name}</TableCell>
									<TableCell align="right">{formatDate(row.date)}</TableCell>
									<TableCell align="right">{row.item.name}</TableCell>
									<TableCell align="right">
										<Chip label={row.type} color="primary" variant="outlined" />
									</TableCell>
									<TableCell align="right">{row.oldQuantity}</TableCell>
									<TableCell align="right">{row.newQuantity}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Loading>
		</>
	);
};

export default Transactions;
