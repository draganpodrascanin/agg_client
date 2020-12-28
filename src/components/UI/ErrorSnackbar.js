import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUiErrorAction } from '../../redux/actions/actionsUI';

export const ErrorSnackbar = () => {
	const dispatch = useDispatch();

	const UI = useSelector((state) => state.UI);
	const handleErrorSnackbarClose = () => {
		dispatch(clearUiErrorAction());
	};

	return (
		<>
			<Snackbar open={!!UI.uiError} onClose={handleErrorSnackbarClose}>
				<Alert
					onClose={handleErrorSnackbarClose}
					severity="error"
					variant="filled"
				>
					{UI.uiError}
				</Alert>
			</Snackbar>
		</>
	);
};
