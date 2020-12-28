import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccessAction } from '../../redux/actions/actionsUI';

export const SuccessSnackbar = () => {
	const dispatch = useDispatch();
	const UI = useSelector((state) => state.UI);

	const handleSuccessSnackbarClose = () => {
		dispatch(clearSuccessAction());
	};

	return (
		<>
			<Snackbar open={!!UI.successMessage} onClose={handleSuccessSnackbarClose}>
				<Alert
					onClose={handleSuccessSnackbarClose}
					severity="success"
					variant="filled"
				>
					{UI.successMessage}
				</Alert>
			</Snackbar>
		</>
	);
};
