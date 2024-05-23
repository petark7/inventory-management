import { Link, useNavigate } from 'react-router-dom';
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
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../axios/axiosInstance';

const defaultTheme = createTheme();

const Login = () => {
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get('email'),
			password: data.get('password')
		});

		try {
			const response = await axiosInstance.post('users/login', {
				email: data.get('email'),
				password: data.get('password')
			});

			if (response.data.token) {
				Cookies.set('authentication', response.data.token, new Date(Date.now() + 60 * 60 * 1000)); // Set cookie that expires in 1h
			}

			console.log(response.data.token);
		} catch (error) {
			console.error('Error logging in:', error.response ? error.response.data : error.message);
		}
	}

	useEffect(() => {
		async function getUserInfo() {
			const response = await axiosInstance.get('/users');
			if (response.status) {
				navigate('/');
			}
		}

		getUserInfo();
	}, [navigate]);

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
						Sign in
					</Typography>
					<Box noValidate component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
						<TextField
							required
							fullWidth
							autoFocus
							margin="normal"
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
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
								<Link to="/register" variant="body2">
									Don't have an account? Sign Up
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default Login;
