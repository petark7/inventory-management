import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsRequest } from '../../redux/slices/inventorySlice';
import Loading from '../../components/Loading';

const Inventory = () => {
	const dispatch = useDispatch();
	const { items, loading } = useSelector(state => state.inventory);

	useEffect(() => {
		dispatch(fetchItemsRequest());
	}, [dispatch]);

	return (
		<Loading isLoading={loading}>
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
								<TableCell align="right">
									<button onClick={() => console.log(row._id)}>Edit</button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Loading>
	);
};

export default Inventory;
