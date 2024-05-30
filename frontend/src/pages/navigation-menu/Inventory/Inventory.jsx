import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Menu, MenuItem } from '@mui/material';
import { deleteProductRequest, fetchItemsRequest } from '../../../redux/slices/inventorySlice';
import Loading from '../../../components/Loading';
import Modal from '../../../components/Modal';
import { Button } from '../../../components/layout/Button';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

const Inventory = () => {
	const [open, setOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleEditOpen = product => {
		setSelectedProduct(product);
		setEditOpen(true);
	};

	const handleDeleteOpen = product => {
		setSelectedProduct(product);
		setDeleteOpen(true);
	};

	const handleDelete = id => {
		dispatch(deleteProductRequest(id));
		handleCloseMenu();
	};

	const handleEditClose = () => setEditOpen(false);
	const handleDeleteClose = () => setDeleteOpen(false);

	const dispatch = useDispatch();
	const { items, loading } = useSelector(state => state.inventory);

	const [anchorElement, setAnchorElement] = useState(null);
	const openMenu = Boolean(anchorElement);
	const handleClick = event => {
		setAnchorElement(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorElement(null);
	};

	useEffect(() => {
		dispatch(fetchItemsRequest());
	}, [dispatch]);

	return (
		<>
			<Box>
				<Button
					sx={{ marginBottom: '10px' }}
					type="button"
					onClick={handleOpen}
				>
					Add new product
				</Button>

				<Modal open={open} onClose={handleClose}>
					<AddProduct onSuccess={handleClose} />
				</Modal>

				<Modal open={editOpen} onClose={handleEditClose}>
					<EditProduct product={selectedProduct} onClose={handleEditClose} />
				</Modal>

				<Modal open={deleteOpen} onClose={handleDeleteClose}>
					<DeleteProduct
						product={selectedProduct}
						handleDelete={handleDelete}
						onClose={handleDeleteClose}
					/>
				</Modal>

			</Box>
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
										<Button onClick={e => {
											handleClick(e);
											setSelectedProduct(row);
										}}
										>
											...
										</Button>
										<Menu
											id="basic-menu"
											anchorEl={anchorElement}
											open={openMenu}
											MenuListProps={{
												'aria-labelledby': 'basic-button'
											}}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right'
											}}
											transformOrigin={{
												vertical: 'top',
												horizontal: 'right'
											}}
											PaperProps={{
												sx: {
													boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)' // Custom shadow
												}
											}}
											onClose={handleCloseMenu}
										>
											<MenuItem onClick={() => {
												handleCloseMenu();
												handleEditOpen(selectedProduct);
											}}
											>
												Edit
											</MenuItem>
											<MenuItem onClick={() => {
												handleCloseMenu();
												handleDeleteOpen(selectedProduct);
											}}
											>Delete
											</MenuItem>
										</Menu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Loading>
		</>
	);
};

export default Inventory;
