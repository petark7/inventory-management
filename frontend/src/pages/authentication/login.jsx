import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { loginRequest } from '../../redux/actions/authActions';
import useAuthRedirect from '../../hooks/useAuthRedirect';

const defaultTheme = createTheme();

const Login = () => {
	const dispatch = useDispatch();
	useAuthRedirect();

	const [formValues, setFormValues] = useState({
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
		temporaryErrors.email = formValues.email ? '' : 'Email is required.';
		temporaryErrors.email = /\S+@\S+\.\S+/.test(formValues.email) ? temporaryErrors.email : 'Email is not valid.';
		temporaryErrors.password = formValues.password ? '' : 'Password is required.';
		setErrors(temporaryErrors);
		return Object.values(temporaryErrors).every(x => x === '');
	};

	const handleSubmit = async event => {
		event.preventDefault();
		if (validate()) {
			dispatch(loginRequest({
				email: formValues.email,
				password: formValues.password
			}));
		} else {
			toast.error('Please fix the errors in the form.');
		}
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">Sign in</Typography>
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
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							value={formValues.email}
							error={Boolean(errors.email)}
							helperText={errors.email}
							onChange={handleChange}
						/>
						<TextField
							required
							fullWidth
							margin="normal"
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={formValues.password}
							error={Boolean(errors.password)}
							helperText={errors.password}
							onChange={handleChange}
						/>
						<Button
							fullWidth
							type="submit"
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link to="/register" variant="body2">Don't have an account? Sign Up</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default Login;
