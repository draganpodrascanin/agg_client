import React from 'react';
import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import {
	KeyboardDateTimePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createAppointmentAction } from '../../redux/actions/appointmentActions';

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

const CreateAppointment = ({
	heading,
	name,
	car,
	note,
	datetime,
	phoneNumber,
	...props
}) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const onSubmit = (v) => {
		dispatch(
			createAppointmentAction(v.name, v.car, v.phoneNumber, v.note, v.datetime)
		);
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Polje Obavezno!'),
		car: Yup.string().required('Polje Obavezno!'),
		note: Yup.string().required('Polje Obavezno!'),
		phoneNumber: Yup.string().required('Polje Obavezno!'),
	});

	const handleDateChange = (date) => {
		formik.setFieldValue('datetime', dayjs(date).format('YYYY-MM-DDTHH:mm'));
	};

	const formik = useFormik({
		initialValues: {
			name: name || '',
			car: car || '',
			phoneNumber: phoneNumber || '',
			note: note || '',
			datetime: datetime || dayjs(new Date()).format('YYYY-MM-DDTHH:mm'),
		},
		onSubmit: props.onSubmit || onSubmit,
		validationSchema,
	});

	return (
		<form>
			<Typography variant="h4" component="h3" style={{ marginLeft: -1 }}>
				{heading || 'Zakaži termin'}
			</Typography>
			<TextField
				className={classes.textField}
				name="name"
				label="Ime"
				value={formik.values.name}
				onChange={formik.handleChange}
				helperText={formik.errors.name}
				error={!!formik.errors.name}
			/>
			<TextField
				className={classes.textField}
				name="car"
				label="Automobil"
				onChange={formik.handleChange}
				value={formik.values.car}
				helperText={formik.errors.car}
				error={!!formik.errors.car}
			/>
			<TextField
				className={classes.textField}
				name="phoneNumber"
				label="Broj Telefona"
				value={formik.values.phoneNumber}
				onChange={formik.handleChange}
				helperText={formik.errors.phoneNumber}
				error={!!formik.errors.phoneNumber}
			/>
			<TextField
				className={classes.textField}
				name="note"
				label="Razlog zakazivanja"
				value={formik.values.note}
				onChange={formik.handleChange}
				helperText={formik.errors.note}
				error={!!formik.errors.note}
			/>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDateTimePicker
					variant="inline"
					ampm={false}
					label="Datum i Vreme"
					value={formik.values.datetime}
					onChange={handleDateChange}
					style={{ display: 'block', marginBottom: 10 }}
					onError={console.log}
					disablePast
					format="dd.MM.yyyy. HH:mm"
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

CreateAppointment.propTypes = {
	onSubmit: PropTypes.func,
	heading: PropTypes.string,
	datetime: PropTypes.any,
	car: PropTypes.string,
	note: PropTypes.string,
	name: PropTypes.string,
	phoneNumber: PropTypes.string,
};

export default CreateAppointment;
