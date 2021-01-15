import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../redux/actions/authAction';
import {
	Button,
	Container,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import { LoadingModal } from './UI/LoadingModal';

const useStyles = makeStyles((theme) => ({
	heading: {
		margin: '3rem 0',
		color: theme.palette.primary.dark,
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	input: {
		width: '100%',
		maxWidth: 400,
		padding: '10px 0px',
	},
	button: { marginTop: 20 },
}));

const LoginForm = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const admin = useSelector((state) => state.admin);
	const UI = useSelector((state) => state.UI);

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		onSubmit: (values) => {
			dispatch(loginAction(values.username, values.password));
		},
	});

	return (
		<Container maxWidth="sm">
			<LoadingModal open={UI.loading} />
			<Typography
				display="block"
				variant="h2"
				component="h1"
				style={{ textAlign: 'center' }}
				className={classes.heading}
			>
				Login
			</Typography>
			<form className={classes.form} onSubmit={formik.handleSubmit}>
				<TextField
					variant="standard"
					label="username"
					name="username"
					onChange={formik.handleChange}
					className={classes.input}
				/>
				<TextField
					id="standard-adornment-password"
					variant="standard"
					label="password"
					name="password"
					type="password"
					onChange={formik.handleChange}
					className={classes.input}
					onKeyPress={(e) => {
						if (e.key === 'Enter') formik.submitForm();
					}}
				/>
				<Button
					variant="contained"
					color="primary"
					size="large"
					disabled={admin.loading}
					onClick={formik.submitForm}
					className={classes.button}
				>
					Potvrdi
				</Button>
			</form>
		</Container>
	);
};

export default LoginForm;
