import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import {
	Button,
	FormControl,
	FormControlLabel,
	makeStyles,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { editAppointmentAction } from '../../redux/actions/appointmentActions';

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

const ConfirmAppointment = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const onSubmit = (v) => {
		dispatch(editAppointmentAction(props.appointmentId, v.showedUp));
	};

	const formik = useFormik({
		initialValues: {
			showedUp: props.showedUp || null,
		},
		onSubmit: props.onSubmit || onSubmit,
	});

	const handleOptionChange = (e) => {
		const val = e.target.value === 'true' ? true : false;
		formik.setFieldValue('showedUp', val);
	};

	return (
		<form className={classes.form}>
			<Typography variant="h4" component="h3" style={{ marginLeft: -1 }}>
				Potvrdi Dolazak Na Termin
			</Typography>
			<FormControl
				component="fieldset"
				style={{ marginBottom: 5, marginLeft: 5 }}
			>
				<RadioGroup
					aria-label="showedUp"
					name="showedUp"
					value={formik.status}
					onChange={handleOptionChange}
				>
					<FormControlLabel
						value={true}
						control={<Radio checked={formik.values.showedUp === true} />}
						label="Potvrdi dolazak."
					/>

					<FormControlLabel
						value={false}
						control={<Radio checked={formik.values.showedUp === false} />}
						label="Termin ne ispoštovan."
					/>
				</RadioGroup>
			</FormControl>
			<Button
				variant="contained"
				color="primary"
				onClick={formik.submitForm}
				disabled={
					!formik.dirty &&
					!(formik.values.showedUp === false || formik.values.showedUp === true)
				}
			>
				Potvrdi
			</Button>
		</form>
	);
};

ConfirmAppointment.propTyps = {
	onSubmit: PropTypes.func,
	appointmentId: PropTypes.string,
	showedUp: PropTypes.bool,
};

export default ConfirmAppointment;
