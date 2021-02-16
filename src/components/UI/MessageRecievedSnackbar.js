import { makeStyles, Snackbar } from '@material-ui/core';
import { Mail } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearMessageRecievedAction } from '../../redux/actions/messageActions';

const useStyles = makeStyles((theme) => ({
	alert: {
		backgroundColor: theme.palette.primary.light,
		color: '#fff',
		textDecoration: 'none',
	},
	content: {
		display: 'flex',
		alignItems: 'center',
		textDecoration: 'none',
	},
	icon: {
		marginRight: 10,
		textDecoration: 'none',
	},
	link: {
		textDecoration: 'none',
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
			<Link to="/poruke" className={classes.link}>
				<Alert
					onClose={handleMessageRecievedSnackbarCloseClose}
					variant="filled"
					className={classes.alert}
				>
					<div className={classes.content}>
						<Mail className={classes.icon} />
						{UI.messageRecieved}
					</div>
				</Alert>
			</Link>
		</Snackbar>
	);
};
