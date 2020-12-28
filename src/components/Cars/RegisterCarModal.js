import React from 'react';
import { makeStyles, Modal, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import CreateCarForm from './CreateCarForm';

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

	return (
		<Modal open={props.open} onClose={props.close}>
			<div className={classes.modal}>
				<Typography variant="h5" component="h3">
					Registruj Novi Automobil
				</Typography>
				<CreateCarForm buttonText="Registruj Novi Automobil" btnSize="large" />
			</div>
		</Modal>
	);
};

RegisterCarModal.propTypes = {
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
};

export default RegisterCarModal;
