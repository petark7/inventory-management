import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { loginRequest } from '../../redux/actions/authActions';
import apiClient from '../../axios/apiClient';
import useAuthRedirect from '../../hooks/useAuthRedirect';

const defaultTheme = createTheme();

const Register = () => {
	const dispatch = useDispatch();
	useAuthRedirect();

	const [formValues, setFormValues] = useState({
		fullName: '',
		email: '',
		password: ''
	});

	const [errors, setErrors] = useState({});

	const handleChange = e => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value
		});
	};

	const validate = () => {
		const temporaryErrors = {};
		temporaryErrors.fullName = formValues.fullName ? '' : 'Full Name is required.';
		temporaryErrors.email = formValues.email ? '' : 'Email is required.';
		temporaryErrors.email = /\S+@\S+\.\S+/.test(formValues.email) ? temporaryErrors.email : 'Email is not valid.';
		temporaryErrors.password = formValues.password ? '' : 'Password is required.';
		setErrors(temporaryErrors);
		return Object.values(temporaryErrors).every(x => x === '');
	};

	const handleSubmit = async event => {
		event.preventDefault();
		if (validate()) {
			try {
				const response = await apiClient.post('/users/register', formValues);
				if (response.status === 201) {
					toast.success(response.data.message);
					dispatch(loginRequest({ email: formValues.email, password: formValues.password }));
				}
			} catch {
				toast.error('Couldn\'t complete registration');
			}
		} else {
			toast.error('Please fix the errors in the form.');
		}
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box
						noValidate
						component="form"
						sx={{ mt: 3 }}
						onSubmit={handleSubmit}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									autoFocus
									autoComplete="given-name"
									name="fullName"
									id="fullName"
									label="Full Name"
									value={formValues.fullName}
									error={Boolean(errors.fullName)}
									helperText={errors.fullName}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									value={formValues.email}
									error={Boolean(errors.email)}
									helperText={errors.email}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									value={formValues.password}
									error={Boolean(errors.password)}
									helperText={errors.password}
									onChange={handleChange}
								/>
							</Grid>
						</Grid>
						<Button
							fullWidth
							type="submit"
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link to="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default Register;
