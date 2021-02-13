import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
	Button,
	FormControl,
	FormControlLabel,
	IconButton,
	InputAdornment,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		minWidth: 400,
	},
	textField: {
		width: '100%',
		marginBottom: 10,
		marginTop: 5,
	},
	heading: {
		marginBottom: 15,
	},
	select: {
		marginBottom: 10,
	},
	formControl: {
		minWidth: 120,
	},
}));

const AdminForm = ({
	firstName,
	lastName,
	phoneNumber,
	email,
	username,
	role,
	...props
}) => {
	const classes = useStyles();

	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleClickShowPasswordConfirm = () => {
		setShowPasswordConfirm(!showPasswordConfirm);
	};
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required('Polje Obavezno!'),
		lastName: Yup.string().required('Polje Obavezno!'),
		phoneNumber: Yup.string().required('Polje Obavezno!'),
		email: Yup.string().required('Polje Obavezno!'),
		username: Yup.string().required('Polje Obavezno!'),
		role: Yup.string().required('Polje Obavezno!'),
		password:
			props.create &&
			Yup.string().min(8, 'Najmanje 8 karaktera.').required('Polje obavezno'),
		passwordConfirm:
			props.create &&
			Yup.string().oneOf([
				Yup.ref('password'),
				'Mora biti isto kao polje šifra.',
			]),
	});

	const onSubmit = (v) => alert(JSON.stringify(v));

	const formik = useFormik({
		initialValues: {
			firstName: firstName || '',
			lastName: lastName || '',
			phoneNumber: phoneNumber || '',
			email: email || '',
			username: username || '',
			role: role || 'mechanic',
			password: '',
			passwordConfirm: '',
		},
		onSubmit: props.onSubmit || onSubmit,
		validationSchema,
	});

	const handleRoleChange = (e) => {
		formik.setFieldValue('role', e.target.value);
	};

	return (
		<form className={classes.form} onSubmit={formik.handleSubmit}>
			<Typography variant="h4" component="h3" className={classes.heading}>
				{props.heading || 'Registruj Administratora'}
			</Typography>
			<TextField
				className={classes.textField}
				variant="outlined"
				name="firstName"
				label="Ime"
				onChange={formik.handleChange}
				value={formik.values.firstName}
				helperText={formik.errors.firstName}
				error={!!formik.errors.firstName}
			/>
			<TextField
				className={classes.textField}
				variant="outlined"
				name="lastName"
				label="Prezime"
				onChange={formik.handleChange}
				value={formik.values.lastName}
				helperText={formik.errors.lastName}
				error={!!formik.errors.lastName}
			/>
			<TextField
				className={classes.textField}
				variant="outlined"
				name="username"
				label="Korisničko Ime"
				onChange={formik.handleChange}
				value={formik.values.username}
				helperText={formik.errors.username}
				error={!!formik.errors.username}
			/>
			<TextField
				className={classes.textField}
				variant="outlined"
				name="phoneNumber"
				label="Broj Telefona"
				onChange={formik.handleChange}
				value={formik.values.phoneNumber}
				helperText={formik.errors.phoneNumber}
				error={!!formik.errors.phoneNumber}
			/>
			<TextField
				className={classes.textField}
				variant="outlined"
				name="email"
				label="Email"
				onChange={formik.handleChange}
				value={formik.values.email}
				helperText={formik.errors.email}
				error={!!formik.errors.email}
			/>
			{props.create && (
				<>
					<TextField
						className={classes.textField}
						type={showPassword ? 'text' : 'password'}
						variant="outlined"
						name="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						label="Šifra"
						helperText={formik.errors.password}
						error={!!formik.errors.password}
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
						className={classes.textField}
						type={showPasswordConfirm ? 'text' : 'password'}
						variant="outlined"
						name="passwordConfirm"
						value={formik.values.passwordConfirm}
						onChange={formik.handleChange}
						label="Ponovi šifru"
						helperText={
							formik.errors.passwordConfirm &&
							//yup added prefix to our custom error, thats why we split
							formik.errors.passwordConfirm.split(':')[1]
						}
						error={!!formik.errors.passwordConfirm}
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
				</>
			)}
			<FormControl className={classes.formControl}>
				<InputLabel>Uloga</InputLabel>
				<Select
					value={formik.values.role}
					onChange={handleRoleChange}
					label="Uloga"
					className={classes.select}
				>
					<MenuItem value={'mechanic'}>Mehaničar</MenuItem>
					<MenuItem value={'blogger'}>Blogger</MenuItem>
					<MenuItem value={'admin'}>Administrator</MenuItem>
				</Select>
			</FormControl>
			<Button
				variant="contained"
				color="primary"
				onClick={formik.submitForm}
				disabled={!formik.isValid || !formik.dirty}
			>
				Potvrdi
			</Button>
		</form>
	);
};

AdminForm.propTypes = {
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	email: PropTypes.string,
	phoneNumber: PropTypes.string,
	username: PropTypes.string,
	role: PropTypes.string,
	create: PropTypes.bool,
	onSubmit: PropTypes.func,
};

export default AdminForm;
