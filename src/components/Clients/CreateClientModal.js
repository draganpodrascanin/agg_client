import {
	Button,
	IconButton,
	InputAdornment,
	makeStyles,
	Modal,
	TextField,
	Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewClientAction } from '../../redux/actions/clientsActions';

const useStyles = makeStyles((theme) => ({
	modalForm: {
		padding: '30px 60px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		background: '#fff',
		outline: 'none',
		'&:focus': {
			outline: 'none',
		},
	},
	modal: {
		outline: 'none',
		border: 'none',
		'&:focus': {
			outline: 'none',
		},
	},
	textInput: {
		width: 400,
		marginBottom: 3,
	},
}));

export const CreateClientModal = (props) => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const dispatch = useDispatch();

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleClickShowPasswordConfirm = () => {
		setShowPasswordConfirm(!showPasswordConfirm);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const onFormSubmit = (values) => {
		dispatch(
			createNewClientAction(
				values.firstName,
				values.lastName,
				values.phoneNumber,
				values.email,
				values.password,
				values.passwordConfirm
			)
		);
	};

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			password: '',
			passwordConfirm: '',
		},
		onSubmit: onFormSubmit,
	});

	return (
		<Modal open={props.open} onClose={props.close} className={classes.modal}>
			<form className={classes.modalForm} onSubmit={formik.handleSubmit}>
				<Typography variant="h4" type="h4">
					Registruj novog klijenta
				</Typography>
				<TextField
					className={classes.textInput}
					name="firstName"
					value={formik.values.firstName}
					onChange={formik.handleChange}
					label="Ime"
				/>
				<TextField
					className={classes.textInput}
					name="lastName"
					value={formik.values.lastName}
					onChange={formik.handleChange}
					label="Prezime"
				/>
				<TextField
					className={classes.textInput}
					name="phoneNumber"
					value={formik.values.phoneNumber}
					onChange={formik.handleChange}
					label="Broj Telefona"
				/>
				<TextField
					className={classes.textInput}
					name="email"
					value={formik.values.email}
					onChange={formik.handleChange}
					label="Email"
				/>
				<TextField
					className={classes.textInput}
					type={showPassword ? 'text' : 'password'}
					name="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					label="Šifra za pristup E-knjižici"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					className={classes.textInput}
					type={showPasswordConfirm ? 'text' : 'password'}
					name="passwordConfirm"
					value={formik.values.passwordConfirm}
					onChange={formik.handleChange}
					label="Ponovi šifru"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password confirm visibility"
									onClick={handleClickShowPasswordConfirm}
									onMouseDown={handleMouseDownPassword}
								>
									{showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button
					size="large"
					color="primary"
					variant="contained"
					onClick={formik.submitForm}
					style={{ marginTop: 15 }}
				>
					Potvrdi
				</Button>
			</form>
		</Modal>
	);
};
