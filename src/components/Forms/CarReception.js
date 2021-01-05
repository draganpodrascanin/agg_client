import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createCarReceptionAction } from '../../redux/actions/carReceptionActions';

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
	},
}));

const CreateCarReception = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const workOrder = useSelector((state) => state.workOrder);

	const onSubmit = (v) => {
		dispatch(
			createCarReceptionAction(
				workOrder.id,
				v.carDamage,
				v.ownerRemarks,
				v.milage
			)
		);
	};

	const validationSchema = Yup.object().shape({
		ownerRemarks: Yup.string().required('Polje Obavezno!'),
		milage: Yup.number().required('Polje Obavezno!'),
	});

	const formik = useFormik({
		initialValues: {
			ownerRemarks: props.ownerRemarks || '',
			milage: props.milage || 100000,
			carDamage: props.carDamage || '',
		},
		onSubmit: props.onSubmit || onSubmit,
		validationSchema,
	});

	return (
		<form className={classes.form} onSubmit={formik.handleSubmit}>
			<Typography variant="h4" component="h3" style={{ marginLeft: -1 }}>
				{props.heading || 'Napravi Prijem'}
			</Typography>
			<TextField
				className={classes.textField}
				name="ownerRemarks"
				label="Vlasnik automobila se žali na"
				value={formik.values.ownerRemarks}
				onChange={formik.handleChange}
				helperText={formik.errors.ownerRemarks}
				error={!!formik.errors.ownerRemarks}
			/>
			<TextField
				className={classes.textField}
				name="milage"
				label="Kilometraža"
				type="number"
				inputProps={{ step: 1000 }}
				onChange={formik.handleChange}
				value={formik.values.milage}
				helperText={formik.errors.milage}
				error={!!formik.errors.milage}
			/>
			<TextField
				className={classes.textField}
				name="carDamage"
				label="Oštećenja na automobilu"
				onChange={formik.handleChange}
				value={formik.values.carDamage}
			/>
			<Button
				variant="contained"
				color="primary"
				disabled={!formik.dirty || !formik.isValid}
				onClick={formik.submitForm}
			>
				Potvrdi
			</Button>
		</form>
	);
};

CreateCarReception.propTypes = {
	onSubmit: PropTypes.func,
	heading: PropTypes.string,
	ownerRemarks: PropTypes.string,
	carDamage: PropTypes.string,
	milage: PropTypes.number,
};

export default CreateCarReception;
