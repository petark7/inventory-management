// Src/components/AddTransaction.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Box, Button, Container, CssBaseline, TextField, Typography, MenuItem, Select, InputLabel, FormControl,
    Autocomplete
} from '@mui/material';
import { fetchItemsRequest } from '../../../redux/slices/inventorySlice';
import { addTransactionRequest } from '../../../redux/slices/transactionsSlice';

const AddTransaction = ({ onSuccess }) => {
	const dispatch = useDispatch();
	const { items } = useSelector(state => state.inventory);
	const { _id } = useSelector(state => state.auth.user);
	const [formValues, setFormValues] = useState({
		itemId: '',
		quantity: 0,
		type: '',
		userId: _id // Replace this with actual user ID from context or state
	});

	useEffect(() => {
		dispatch(fetchItemsRequest());
	}, [dispatch]);

	const handleChange = e => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value
		});
	};

	const handleItemChange = (event, newValue) => {
		setFormValues({
			...formValues,
			itemId: newValue ? newValue._id : ''
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();
		dispatch(addTransactionRequest(formValues));
		onSuccess();
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box sx={{
				marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'
			}}
			>
				<Typography component="h1" variant="h5">Add a Transaction</Typography>
				<Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
					<FormControl fullWidth margin="normal">
						<Autocomplete
							id="itemId"
							options={items}
							getOptionLabel={option => `${option.name} (${option.quantity} in stock)`}
							renderInput={parameters => <TextField {...parameters} required label="Item" />}
							onChange={handleItemChange}
						/>
					</FormControl>
					<TextField
						required
						fullWidth
						margin="normal"
						id="quantity"
						label="Quantity"
						name="quantity"
						type="number"
						value={formValues.quantity}
						onChange={handleChange}
					/>
					<FormControl fullWidth margin="normal">
						<Autocomplete
							id="type"
							options={['sale', 'restock']}
							getOptionLabel={option => option.charAt(0).toUpperCase() + option.slice(1)}
							renderInput={parameters => <TextField {...parameters} required label="Type" />}
							onChange={(event, newValue) => setFormValues({
								...formValues,
								type: newValue
							})}
						/>
					</FormControl>
					<Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
						Add
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default AddTransaction;
