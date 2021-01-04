import React from 'react';
import { makeStyles, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	modal: {
		outline: 'none',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',

		background: '#fff',
		padding: '30px 45px',

		'&:focus, &:active': {
			outline: 'none',
		},
	},
}));

const CustomModal = ({ open, onClose, ...props }) => {
	const classes = useStyles();

	return (
		<Modal open={open} onClose={onClose}>
			<div className={classes.modal}>{props.children}</div>
		</Modal>
	);
};

CustomModal.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
};

export default CustomModal;
