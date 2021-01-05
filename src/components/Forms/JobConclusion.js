import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	Button,
	InputAdornment,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createJobConclusionAction } from '../../redux/actions/jobConclusionActions';

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
	select: {
		marginBottom: 10,
	},
	heading: {
		marginLeft: -1,
	},
	chargedField: {
		marginBottom: 10,
		width: 120,
	},
}));

const JobConclusion = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const workOrder = useSelector((state) => state.workOrder);

	const onSubmit = (v) => {
		dispatch(
			createJobConclusionAction(workOrder.id, v.workDone, v.note, v.charged)
		);
	};

	const validationSchema = Yup.object().shape({
		workDone: Yup.string().required('Polje Obavezno!'),
		charged: Yup.number().required('Polje Obavezno!'),
	});

	const formik = useFormik({
		initialValues: {
			workDone: props.workDone || '',
			note: props.note || '',
			charged: props.charged || 50,
		},
		onSubmit: props.onSubmit || onSubmit,
		validationSchema,
	});

	return (
		<form className={classes.form}>
			<Typography variant="h4" component="h3" className={classes.heading}>
				{props.heading || 'Zaključi Servisni Nalog'}
			</Typography>
			<TextField
				className={classes.textField}
				name="workDone"
				label="Odrađen Posao"
				multiline
				rows={2}
				onChange={formik.handleChange}
				value={formik.values.workDone}
				helperText={formik.errors.workDone}
				error={!!formik.errors.workDone}
			/>
			<TextField
				className={classes.textField}
				name="note"
				label="Napomena Servisera"
				multiline
				rows={2}
				onChange={formik.handleChange}
				value={formik.values.note}
				helperText={formik.errors.note}
				error={!!formik.errors.note}
			/>
			<TextField
				className={classes.chargedField}
				name="charged"
				label="Naplaćeno"
				type="number"
				inputProps={{ step: 10 }}
				InputProps={{
					endAdornment: <InputAdornment position="end">KM</InputAdornment>,
				}}
				onChange={formik.handleChange}
				value={formik.values.charged}
				helperText={formik.errors.charged}
				error={!!formik.errors.charged}
			/>
			<Button
				variant="contained"
				disabled={!formik.dirty || !formik.isValid}
				color="primary"
				onClick={formik.submitForm}
			>
				Potvrdi
			</Button>
		</form>
	);
};

JobConclusion.propTypes = {
	heading: PropTypes.string,
	workDone: PropTypes.string,
	note: PropTypes.string,
	charged: PropTypes.number,
	onSubmit: PropTypes.func,
};

export default JobConclusion;
