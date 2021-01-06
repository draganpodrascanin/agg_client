import React from 'react';
import CustomModal from './CustomModal';
import PropTypes from 'prop-types';
import { Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
	},
	buttonContainer: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
	},
	heading: {
		marginBottom: 20,
		textAlign: 'center',
	},
	button: { width: 150, marginRight: 15 },
}));

const DeleteModal = ({ heading, open, onClose, onSubmit, btn1, btn2 }) => {
	const classes = useStyles();

	return (
		<CustomModal open={open} onClose={onClose}>
			<form className={classes.form}>
				<Typography variant="h4" component="h3" className={classes.heading}>
					{heading || 'Da li ste sigurni da želite da obrišete?'}
				</Typography>

				<div className={classes.buttonContainer}>
					<Button
						variant="contained"
						size="large"
						color="secondary"
						onClick={onSubmit}
						className={classes.button}
					>
						{btn1 || 'Obriši'}
					</Button>
					<Button
						variant="contained"
						size="large"
						color="primary"
						onClick={onClose}
						className={classes.button}
					>
						{btn2 || 'Otkaži'}
					</Button>
				</div>
			</form>
		</CustomModal>
	);
};

DeleteModal.propTypes = {
	heading: PropTypes.string,
	open: PropTypes.bool,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
};

export default DeleteModal;
