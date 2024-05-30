import {
	Box, Button, Container, Typography
} from '@mui/material';

const DeleteProduct = ({ product, onClose, handleDelete }) => (
	<Container component="main" maxWidth="xs">
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'start',
			gap: 2
		}}
		>
			<Typography variant="h5">Are you sure you want to delete?</Typography>
			<Typography variant="body1">Deleting {product.name}</Typography>
			<Box sx={{
				display: 'flex', gap: 1, justifyContent: 'end', width: '100%'
			}}
			>
				<Button onClick={onClose}>Cancel</Button>
				<Button
					color="error" onClick={() => {
						handleDelete(product._id);
						onClose();
					}}
				>Delete
				</Button>
			</Box>
		</Box>
	</Container>
);

export default DeleteProduct;
