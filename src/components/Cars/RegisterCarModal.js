import React from 'react';
import { makeStyles, Modal, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import CreateCarForm from './CreateCarForm';
import { useDispatch } from 'react-redux';
import { createCarAction } from '../../redux/actions/carActions';

const useStyles = makeStyles((theme) => ({
	modal: {
		padding: '40px 60px',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		background: '#fff',
		outline: 'none',
		width: 400,

		'&:fokus': {
			outline: 'none',
		},
	},
}));

const RegisterCarModal = (props) => {
	const classes = useStyles();

	const dispatch = useDispatch();

	const registerCarModalHandleSubmit = (val) => {
		dispatch(
			createCarAction(
				val.carBrand,
				val.carModel,
				val.registration,
				val.engine,
				val.milage,
				val.productionYear
			)
		);
	};

	return (
		<Modal open={props.open} onClose={props.close}>
			<div className={classes.modal}>
				<Typography variant="h5" component="h3">
					Registruj Novi Automobil
				</Typography>
				<CreateCarForm
					handleSubmit={registerCarModalHandleSubmit}
					buttonText="Registruj Novi Automobil"
					btnSize="large"
				/>
			</div>
		</Modal>
	);
};

RegisterCarModal.propTypes = {
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
};

export default RegisterCarModal;
