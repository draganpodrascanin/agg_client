import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
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
}));

const CarExam = (props) => {
	const classes = useStyles();

	const onSubmit = (v) => {
		alert(JSON.stringify(v));
	};

	const validationSchema = Yup.object().shape({
		examConclusion: Yup.string().required('Polje Obavezno!'),
	});

	const formik = useFormik({
		initialValues: {
			examConclusion: props.examConclusion || '',
		},
		onSubmit: props.onSubmit || onSubmit,
		validationSchema,
	});

	return (
		<form className={classes.form} onSubmit={formik.handleSubmit}>
			<Typography variant="h4" component="h3">
				Pregled Automobila
			</Typography>
			<TextField
				className={classes.textField}
				multiline
				rows={3}
				name="examConclusion"
				label="Zaključak pregleda"
				onChange={formik.handleChange}
				value={formik.values.examConclusion}
				helperText={formik.errors.examConclusion}
				error={!!formik.errors.examConclusion}
			/>
			<Button
				variant="contained"
				color="primary"
				onClick={formik.submitForm}
				disabled={!formik.dirty || !formik.isValid}
			>
				Potvrdi
			</Button>
		</form>
	);
};

CarExam.propTypes = {
	onSubmit: PropTypes.func,
	examConclusion: PropTypes.string,
};

export default CarExam;
