import { makeStyles, Snackbar } from '@material-ui/core';
import { Mail } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessageRecievedAction } from '../../redux/actions/messageActions';

const useStyles = makeStyles((theme) => ({
	alert: {
		backgroundColor: theme.palette.primary.light,
		color: '#fff',
	},
	content: {
		display: 'flex',
		alignItems: 'center',
	},
	icon: {
		marginRight: 10,
	},
}));

export const MessageRecievedSnackbar = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const UI = useSelector((state) => state.UI);

	const handleMessageRecievedSnackbarCloseClose = () => {
		dispatch(clearMessageRecievedAction());
	};

	return (
		<Snackbar
			open={!!UI.messageRecieved}
			onClose={handleMessageRecievedSnackbarCloseClose}
			autoHideDuration={10000}
		>
			<Alert
				onClose={handleMessageRecievedSnackbarCloseClose}
				variant="filled"
				className={classes.alert}
				severity="blank"
			>
				<div className={classes.content}>
					<Mail className={classes.icon} />
					{UI.messageRecieved}
				</div>
			</Alert>
		</Snackbar>
	);
};
