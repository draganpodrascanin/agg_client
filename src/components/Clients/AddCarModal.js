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
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	carSuggestionOpenAction,
	carSuggestionCloseAction,
	getCarSuggestionsAction,
	carSuggestionLoadingAction,
} from '../../redux/actions/carSuggestionActions';
import { setClientCarOwnershipAction } from '../../redux/actions/clientsActions';
import { createDebounce } from '../util/debounce';

const debounce = createDebounce();

const useStyles = makeStyles((theme) => ({
	modalForm: {
		padding: '30px 60px',
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

	const [overRegForm, setOverRegForm] = useState({
		registration: '',
		formRef: useRef(null),
		handleChange(e) {
			setOverRegForm({ ...overRegForm, registration: e.target.value });
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			setClientCarOwnershipAction(overRegForm.registration, props.clientId)
		);
		setOverRegForm({ ...overRegForm, registration: '' });
	};

	useEffect(() => {
		if (overRegForm.registration !== '')
			debounce(
				() => dispatch(getCarSuggestionsAction(overRegForm.registration)),
				700,
				() => dispatch(carSuggestionLoadingAction())
			);
	}, [dispatch, overRegForm.registration]);

	return (
		<Modal open={props.open} onClose={props.close} className={classes.modal}>
			<div className={classes.modalForm}>
				<form
					ref={overRegForm.formRef}
					style={{ marginBottom: 16 }}
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(e);
					}}
				>
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
						renderOption={(option) => (
							<div
								onClick={() => {
									setOverRegForm({
										...overRegForm,
										registration: option.registration,
									});
								}}
							>
								{option.registration} : {option.carBrand} {option.carModel}{' '}
								{option.productionYear}
							</div>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								value={overRegForm.registration}
								onChange={overRegForm.handleChange}
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
						onClick={handleSubmit}
					>
						Potvrdi
					</Button>
				</form>
				<div className={classes.hr} />
				<form style={{ marginTop: 10 }}>
					<Typography variant="h5" type="h5">
						Novi Automobil:
					</Typography>
				</form>
			</div>
		</Modal>
	);
};

AddCarModal.propTypes = {
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	clientId: PropTypes.string,
};

export default AddCarModal;
