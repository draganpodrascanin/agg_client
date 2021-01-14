import React from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { createWarrantyAction } from '../../redux/actions/warrantyActions';

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

const Warranty = ({ partsUnderWarranty, validUntil, ...props }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const onSubmit = (v) => {
		dispatch(
			createWarrantyAction(props.carId, v.partsUnderWarranty, v.validUntil)
		);
	};

	const validationSchema = Yup.object().shape({
		partsUnderWarranty: Yup.string().required('Polje Obavezno!'),
	});

	const handleDateChange = (date) => {
		formik.setFieldValue('validUntil', dayjs(date).format('YYYY-MM-DDTHH:mm'));
	};

	const formik = useFormik({
		initialValues: {
			partsUnderWarranty: partsUnderWarranty || '',
			validUntil:
				validUntil || dayjs(new Date()).add(1, 'year').format('YYYY-MM-DD'),
		},
		onSubmit: props.onSubmit || onSubmit,
		validationSchema,
	});

	return (
		<form className={classes.form} onSubmit={formik.handleSubmit}>
			<Typography variant="h4" component="h3" style={{ marginLeft: -1 }}>
				{props.heading || 'Dodaj Garanciju'}
			</Typography>
			<TextField
				className={classes.textField}
				name="partsUnderWarranty"
				label="Delovi pod garancijom:"
				multiline
				rows={2}
				onChange={formik.handleChange}
				value={formik.values.partsUnderWarranty}
				helperText={formik.errors.partsUnderWarranty}
				error={!!formik.errors.partsUnderWarranty}
			/>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					variant="inline"
					ampm={false}
					label="Garancija važi do:"
					value={formik.values.validUntil}
					onChange={handleDateChange}
					style={{ display: 'block', marginBottom: 10 }}
					format="dd.MM.yyyy"
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</MuiPickersUtilsProvider>
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

Warranty.propTypes = {
	partsUnderWarranty: PropTypes.string,
	validUntil: PropTypes.any,
	carId: PropTypes.string,
};

export default Warranty;
