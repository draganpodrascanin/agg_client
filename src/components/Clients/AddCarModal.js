import {
	Button,
	CircularProgress,
	makeStyles,
	Modal,
	TextField,
	Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCarAndSetOwnerAction } from '../../redux/actions/carActions';
import {
	carSuggestionOpenAction,
	carSuggestionCloseAction,
	getCarSuggestionsAction,
	carSuggestionLoadingAction,
} from '../../redux/actions/carSuggestionActions';
import { setClientCarOwnershipAction } from '../../redux/actions/clientsActions';
import { createDebounce } from '../util/debounce';
import CreateCarForm from '../Cars/CreateCarForm';
import { useFormik } from 'formik';

const debounce = createDebounce();

const useStyles = makeStyles((theme) => ({
	modalForm: {
		padding: '40px 60px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		background: '#fff',
		outline: 'none',
		'&:focus': {
			outline: 'none',
		},
	},
	modal: {
		outline: 'none',
		border: 'none',
		overflowY: 'scroll',
		'&:focus': {
			outline: 'none',
		},
	},
	textInput: {
		width: 400,
		marginBottom: 3,
	},
	hr: {
		height: 1,
		backgroundColor: 'rgba(0, 0, 0, .17)',
		alignSelf: 'center',
		width: '110%',
	},
}));

const AddCarModal = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const carSuggestions = useSelector((state) => state.carSuggestions);
	let modal = useRef();

	const handleSubmit = (v) => {
		dispatch(setClientCarOwnershipAction(v.registration, props.clientId));
	};

	const formik = useFormik({
		initialValues: {
			registration: '',
		},
		onSubmit: handleSubmit,
	});

	const handleOptionChoice = (val) => {
		formik.setFieldValue('registration', val);
	};

	useEffect(() => {
		if (formik.values.registration !== '')
			debounce(
				() => dispatch(getCarSuggestionsAction(formik.values.registration)),
				700,
				() => dispatch(carSuggestionLoadingAction())
			);
	}, [dispatch, formik.values.registration]);

	setTimeout(() => {
		if (modal?.current?.offsetHeight >= window.innerHeight) {
			modal.current.style.height = '80vh';
			modal.current.style.overflowY = 'scroll';
		}
	});

	const handleCreateCarFormSubmit = (val) => {
		dispatch(
			createCarAndSetOwnerAction(
				val.carBrand,
				val.carModel,
				val.registration,
				val.engine,
				val.milage,
				val.productionYear,
				props.clientId
			)
		);
	};

	return (
		<Modal open={props.open} onClose={props.close} className={classes.modal}>
			<div ref={modal} className={classes.modalForm}>
				<form style={{ marginBottom: 16 }} onSubmit={formik.handleSubmit}>
					<Typography variant="h5" tyle="h4" style={{ marginBottom: 10 }}>
						Postojeći automobil preko registracije:
					</Typography>
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
						onInputChange={(e, val, reason) => {
							handleOptionChoice(val);
						}}
						renderOption={(option) => (
							<React.Fragment>
								{option.registration} : {option.carBrand} {option.carModel}{' '}
								{option.productionYear}
							</React.Fragment>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								value={formik.values.registration}
								onChange={formik.handleChange}
								className={classes.textInput}
								label="Registracija"
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
						onClick={formik.handleSubmit}
					>
						Potvrdi
					</Button>
				</form>
				<div className={classes.hr} />
				<Typography variant="h5" type="h5" style={{ marginTop: 10 }}>
					Novi Automobil:
				</Typography>

				<CreateCarForm
					buttonText="Potvrdi Registraciju novog automobila"
					handleSubmit={handleCreateCarFormSubmit}
				/>
			</div>
		</Modal>
	);
};

AddCarModal.propTypes = {
	open: PropTypes.bool,
	close: PropTypes.func,
	clientId: PropTypes.string,
};

export default AddCarModal;
