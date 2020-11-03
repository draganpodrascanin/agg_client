import React from 'react';
import {
	Button,
	IconButton,
	makeStyles,
	Toolbar,
	Typography,
	AppBar,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import { logoutAdminAction } from '../redux/actions/authAction';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const CustomAppBar = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutAdminAction());
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton
					edge="start"
					className={classes.menuButton}
					color="inherit"
					aria-label="menu"
					onClick={props.drawerHandler}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					News
				</Typography>
				<Button color="inherit" onClick={handleLogout}>
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default CustomAppBar;
