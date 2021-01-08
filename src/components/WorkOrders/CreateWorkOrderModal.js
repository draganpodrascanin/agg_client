import {
	Button,
	CircularProgress,
	makeStyles,
	Modal,
	TextField,
	Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	carSuggestionCloseAction,
	carSuggestionLoadingAction,
	carSuggestionOpenAction,
	getCarSuggestionsAction,
} from '../../redux/actions/carSuggestionActions';
import PropTypes from 'prop-types';
import { createDebounce } from '../util/debounce';
import { createWorkOrderAction } from '../../redux/actions/workOrderActions';

const debounce = createDebounce();

const useStyles = makeStyles((theme) => ({
	container: {
		background: '#fff',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		display: 'flex',
		flexDirection: 'column',
		outline: 'none',
		padding: '35px 50px',
		'&:fokus': {
			outline: 'none',
		},
	},
	textInput: {
		width: 400,
		marginBottom: 3,
	},
}));

const CreateWorkOrderModal = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const carSuggestions = useSelector((state) => state.carSuggestions);

	const formik = useFormik({
		initialValues: {
			registration: '',
		},
		onSubmit: (v) => {
			dispatch(createWorkOrderAction(v.registration));
		},
	});

	useEffect(() => {
		if (formik.values.registration !== '')
			debounce(
				() => dispatch(getCarSuggestionsAction(formik.values.registration)),
				700,
				() => dispatch(carSuggestionLoadingAction())
			);
	}, [dispatch, formik.values.registration]);

	return (
		<Modal onClose={props.onClose} open={props.open}>
			<div className={classes.container}>
				<Typography variant="h4" style={{ marginBottom: 15 }}>
					Novi Servisni Nalog
				</Typography>
				<form
					style={{
						marginBottom: 16,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
					}}
					onSubmit={formik.handleSubmit}
				>
					<Autocomplete
						open={carSuggestions.open}
						onOpen={() => {
							dispatch(carSuggestionOpenAction());
						}}
						onClose={() => {
							dispatch(carSuggestionCloseAction());
						}}
						options={carSuggestions.cars}
						getOptionSelected={(option, value) => {
							return option.registration === value.registration;
						}}
						getOptionLabel={(option) => `${option.registration}`}
						loading={carSuggestions.loading}
						renderOption={(option) => (
							<div
								onClick={() => {
									formik.setFieldValue('registration', option.registration);
								}}
							>
								{option.registration} : {option.carBrand} {option.carModel}{' '}
								{option.productionYear}
							</div>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								value={formik.values.registration}
								onChange={formik.handleChange}
								className={classes.textInput}
								label="registracija automobila"
								variant="outlined"
								name="registration"
								id="registration"
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<React.Fragment>
											{carSuggestions.loading ? (
												<CircularProgress color="inherit" size={20} />
											) : null}
											{params.InputProps.endAdornment}
										</React.Fragment>
									),
								}}
							/>
						)}
					/>
					<Button
						variant="contained"
						color="primary"
						size="medium"
						style={{ marginTop: 5 }}
						onClick={formik.submitForm}
					>
						Potvrdi
					</Button>
				</form>
			</div>
		</Modal>
	);
};

CreateWorkOrderModal.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
};

export default CreateWorkOrderModal;
