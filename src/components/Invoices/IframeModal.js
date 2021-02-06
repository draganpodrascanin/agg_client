import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	modal: {
		position: 'fixed !important',
		outline: 'none',
		top: '50% !important',
		left: '50% !important',
		transform: 'translate(-50%, -50%)',
		height: '100%',
		width: '100%',

		'&:focus, &:active': {
			outline: 'none',
		},
	},

	iframe: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
}));

const IframeModal = ({ open, onClose, path }) => {
	const classes = useStyles();

	return (
		<Modal className={classes.modal} open={open} onClose={onClose}>
			<iframe
				title="invoice-pdf"
				src={`http://localhost:5000${path}`}
				frameBorder="0"
				width="80%"
				height="90%"
				className={classes.iframe}
			/>
		</Modal>
	);
};

IframeModal.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	path: PropTypes.string,
};

export default IframeModal;
