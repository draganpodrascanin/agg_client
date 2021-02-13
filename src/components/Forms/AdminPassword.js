import React, { useState } from 'react';
import {
	Button,
	IconButton,
	InputAdornment,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

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

const AdminPasswordForm = (props) => {
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
		password: Yup.string()
			.min(8, 'Najmanje 8 karaktera.')
			.required('Polje obavezno'),
		passwordConfirm: Yup.string().oneOf([
			Yup.ref('password'),
			'Mora biti isto kao polje šifra.',
		]),
	});

	const formik = useFormik({
		initialValues: {
			password: '',
			passwordConfirm: '',
		},
		onSubmit: props.onSubmit,
		validationSchema,
	});

	return (
		<form className={classes.form}>
			<Typography variant="h4" component="h3" className={classes.heading}>
				Promeni Šifru
			</Typography>
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
			<Button
				size="large"
				color="primary"
				variant="contained"
				onClick={formik.submitForm}
				style={{ marginTop: 5 }}
				disabled={!formik.dirty || !formik.isValid}
			>
				Potvrdi
			</Button>
		</form>
	);
};

AdminPasswordForm.propTypes = {
	onSubmit: PropTypes.func,
};

export default AdminPasswordForm;
