import React from 'react';
import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	modal: {
		outline: 'none',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		overflowY: 'scroll',
		maxHeight: '90vh',
		background: '#fff',
		padding: '45px 55px',

		'&:focus, &:active': {
			outline: 'none',
		},

		'@media screen and (max-width: 900px)': {
			padding: '45px 25px',
			width: '80%',
		},
	},
}));

const CustomModal = ({ open, onClose, ...props }) => {
	const classes = useStyles();

	return (
		<Modal
			open={open}
			onClose={onClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<div className={classes.modal}>{props.children}</div>
			</Fade>
		</Modal>
	);
};

CustomModal.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
};

export default CustomModal;
