import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	Button,
	FormControl,
	InputLabel,
	makeStyles,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createJobTicketAction } from '../../redux/actions/jobTicketsActions';

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
}));

const JobTicket = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const workOrder = useSelector((state) => state.workOrder);

	const onSubmit = (v) => {
		dispatch(createJobTicketAction(workOrder.id, v.ticket, v.status));
	};

	const validationSchema = Yup.object().shape({
		ticket: Yup.string().required('Polje Obavezno!'),
		status: Yup.string().required('Obavezno označiti status!'),
	});

	const formik = useFormik({
		initialValues: {
			ticket: props.ticket || '',
			status: props.status || '',
		},
		onSubmit: props.onSubmit || onSubmit,
		validationSchema,
	});

	const handleSelectChange = (event) => {
		const value = event.target.value;

		console.log('value - ', value);

		formik.setFieldValue('status', value);
	};

	console.log('status - ', formik.values.status);

	return (
		<form className={classes.form} onSubmit={formik.handleSubmit}>
			<Typography variant="h4" component="h3" className={classes.heading}>
				{props.heading || 'Otvori Radni Nalog'}
			</Typography>
			<TextField
				className={classes.textField}
				name="ticket"
				label="Zadatak"
				multiline
				rows={2}
				onChange={formik.handleChange}
				value={formik.values.ticket}
				helperText={formik.errors.ticket}
				error={formik.errors.ticket}
			></TextField>
			<FormControl className={classes.formControl}>
				<InputLabel htmlFor="status-select">Status Naloga</InputLabel>
				<Select
					native
					className={classes.select}
					onChange={handleSelectChange}
					inputProps={{
						id: 'status-select',
					}}
				>
					<option aria-label="None" value="" />
					<option value={'to-do'}>Na Čekanju</option>
					<option value={'in-progress'}>U Radu</option>
					<option value={'waiting-for-parts'}>Čekanje Na Delove</option>
					<option value={'finished'}>Završeno</option>
				</Select>
			</FormControl>
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

JobTicket.propTyps = {
	onSubmit: PropTypes.func,
	heading: PropTypes.string,
	status: PropTypes.oneOf([
		'to-do',
		'waiting-for-parts',
		'in-progress',
		'finished',
	]),
	ticket: PropTypes.string,
};

export default JobTicket;
