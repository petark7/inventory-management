import { useState } from 'react';
import {
	Box, Button, Container, CssBaseline, TextField, Typography
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProductRequest } from '../../../redux/slices/inventorySlice';

const AddProduct = ({ onSuccess }) => {
	const dispatch = useDispatch();

	const [formValues, setFormValues] = useState({
		name: '',
		description: '',
		price: 0,
		quantity: 0
	});

	const [formErrors, setFormErrors] = useState({
		name: '',
		description: '',
		price: '',
		quantity: ''
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value
		});
	};

	const validateForm = () => {
		const errors = {};
		let valid = true;

		if (!formValues.name) {
			errors.name = 'Product name is required';
			valid = false;
		}

		if (!formValues.description) {
			errors.description = 'Description is required';
			valid = false;
		}

		if (formValues.price <= 0) {
			errors.price = 'Price must be greater than 0';
			valid = false;
		}

		if (formValues.quantity <= 0) {
			errors.quantity = 'Quantity must be greater than 0';
			valid = false;
		}

		setFormErrors(errors);
		return valid;
	};

	const handleSubmit = async event => {
		event.preventDefault();
		if (validateForm()) {
			dispatch(addProductRequest(formValues));
			onSuccess();
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box sx={{
				marginTop: 1,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
			>
				<Typography component="h1" variant="h5">Add a product</Typography>
				<Box
					noValidate
					component="form"
					sx={{ mt: 1 }}
					onSubmit={handleSubmit}
				>
					<TextField
						required
						fullWidth
						autoFocus
						margin="normal"
						id="name"
						label="Product name"
						name="name"
						value={formValues.name}
						error={Boolean(formErrors.name)}
						helperText={formErrors.name}
						onChange={handleChange}
					/>
					<TextField
						required
						fullWidth
						margin="normal"
						name="description"
						label="Description"
						id="description"
						value={formValues.description}
						error={Boolean(formErrors.description)}
						helperText={formErrors.description}
						onChange={handleChange}
					/>
					<Box sx={{ display: 'flex', gap: 2 }}>
						<TextField
							required
							fullWidth
							margin="normal"
							id="price"
							label="Price (in USD)"
							type="number"
							name="price"
							value={formValues.price}
							error={Boolean(formErrors.price)}
							helperText={formErrors.price}
							InputLabelProps={{
								shrink: true
							}}
							sx={{ flex: 1 }}
							onChange={handleChange}
						/>
						<TextField
							required
							fullWidth
							margin="normal"
							id="quantity"
							label="Quantity"
							type="number"
							name="quantity"
							value={formValues.quantity}
							error={Boolean(formErrors.quantity)}
							helperText={formErrors.quantity}
							InputLabelProps={{
								shrink: true
							}}
							sx={{ flex: 1 }}
							onChange={handleChange}
						/>
					</Box>
					<Button
						fullWidth
						type="submit"
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Add
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default AddProduct;
