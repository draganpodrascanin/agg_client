import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useFormik } from 'formik';
import React from 'react';

const useStyle = makeStyles({
	textInput: {
		width: '100%',
		maxWidth: 400,
		marginBottom: 3,
		'&:not(:nth-last-child(3))': {
			marginBottom: 10,
		},
	},
	form: {
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginTop: 12,
	},
});

const CreateCarForm = (props) => {
	const classes = useStyle();
	const formik = useFormik({
		initialValues: {
			carBrand: '',
			carModel: '',
			registration: '',
			engine: '',
			milage: 100000,
			productionYear: new Date(),
		},
		onSubmit: props.handleSubmit,
	});

	const handleProdYearChange = (date) => {
		formik.setFieldValue('productionYear', new Date(date));
	};

	return (
		<form className={classes.form} onSubmit={formik.handleSubmit}>
			<TextField
				className={classes.textInput}
				name="carBrand"
				value={formik.values.carBrand}
				onChange={formik.handleChange}
				label="Proizvodjac Automobila"
				variant="outlined"
			/>
			<TextField
				className={classes.textInput}
				name="carModel"
				value={formik.values.carModel}
				onChange={formik.handleChange}
				label="Model Automobila"
				variant="outlined"
			/>
			<TextField
				className={classes.textInput}
				name="registration"
				value={formik.values.registration}
				onChange={formik.handleChange}
				label="Registracija"
				variant="outlined"
			/>
			<TextField
				className={classes.textInput}
				name="engine"
				value={formik.values.engine}
				onChange={formik.handleChange}
				label="Motor"
				variant="outlined"
			/>
			<TextField
				className={classes.textInput}
				name="milage"
				value={formik.values.milage}
				type="number"
				onChange={formik.handleChange}
				label="Kilometraza"
				variant="outlined"
				inputProps={{ step: 1000 }}
			/>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<DatePicker
					views={['year']}
					format="yyyy"
					label="Godina proizvodnje"
					name="productionYear"
					value={formik.values.productionYear}
					onChange={handleProdYearChange}
					margin="dense"
					variant="dialog"
					animateYearScrolling
				/>
				<Button
					style={{ marginTop: 5 }}
					color="primary"
					variant="contained"
					onClick={formik.submitForm}
					size={props.btnSize ? props.btnSize : 'small'}
				>
					{props.buttonText}
				</Button>
			</MuiPickersUtilsProvider>
		</form>
	);
};

CreateCarForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	buttonText: PropTypes.string,
	btnSize: PropTypes.string,
};

export default CreateCarForm;
