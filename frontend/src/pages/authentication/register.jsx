import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../../redux/actions/authActions';
import apiClient from '../../axios/apiClient';

const defaultTheme = createTheme();

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { accessToken, initialLoad } = useSelector(state => state.auth);

	const handleSubmit = async event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const formData = ({
			fullName: data.get('fullName'),
			email: data.get('email'),
			password: data.get('password')
		});

		try {
			const response = await apiClient.post('/users/register', formData);
			if (response.status === 201) {
				toast.success(response.data.message);
				dispatch(loginRequest({ email: formData.email, password: formData.password }));
			}
		} catch (error) {
			toast.error(error.data.message);
		}
	};

	useEffect(() => {
		if (accessToken && !initialLoad) {
			navigate('/');
		}
	}, [accessToken, initialLoad, navigate]);

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
								<Link href="#" variant="body2">
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
