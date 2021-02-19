import React, { Fragment, useEffect, useState } from 'react';
import {
	Drawer,
	ListItem,
	ListItemText,
	List,
	makeStyles,
	Divider,
	Typography,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import AppBar from './AppBar';

//icons
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import DriveEtaRoundedIcon from '@material-ui/icons/DriveEtaRounded';
import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import EventAvailableRoundedIcon from '@material-ui/icons/EventAvailableRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import { AssignmentInd, Mail } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUnreadMessagesNumberAction } from '../redux/actions/messageActions';

const useStyles = makeStyles((theme) => ({
	list: {
		paddingTop: 30,
		width: 360,
		height: '100%',
		backgroundColor: theme.palette.primary.dark,
	},
	item: {
		color: theme.palette.grey[800],
		'& span, & svg': {
			fontSize: 20,
			fontWeight: 200,
			color: '#fff',
			textTransform: 'capitalize',
		},
	},
	heading: {
		color: '#fff',
		fontSize: 30,
		margin: 15,
		fontWeight: 700,
	},
	icon: {
		color: 'white',
		marginRight: '5px',
	},
	button: {
		position: 'absolute',
		top: 15,
		left: 15,
		backgroundColor: theme.palette.primary.dark,
	},
	selected: {
		backgroundColor: 'rgba(255,255,255,0.3)',
		border: 'solid 1px rgba(255,255,255,0.3)',
	},
	unreadMessagesDiv: {
		height: 30,
		width: 30,
		background: theme.palette.secondary.main,
		color: '#fff',
		borderRadius: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

//helper-component
const ListItemLink = (props) => {
	const classes = useStyles();
	return (
		<Fragment>
			<ListItem
				button
				component={NavLink}
				activeClassName={classes.selected}
				{...props}
			/>
		</Fragment>
	);
};

export const Navigation = () => {
	const classes = useStyles();
	const [openDrawer, setOpenDrawer] = useState(false);

	const toggleDrawer = () => {
		setOpenDrawer(!openDrawer);
	};

	const dispatch = useDispatch();
	const unreadMessagesNumber = useSelector(
		(state) => state.messages.unreadMessages
	);

	useEffect(() => {
		dispatch(getUnreadMessagesNumberAction());
	}, [dispatch]);

	return (
		<div>
			<AppBar drawerHandler={toggleDrawer} />
			<Drawer anchor={'left'} open={openDrawer} onClose={toggleDrawer}>
				<div className={classes.list}>
					<List component="nav">
						<ListItemLink to="/" exact>
							<DashboardRoundedIcon className={classes.icon} fontSize="small" />
							<ListItemText className={classes.item} primary="Dashboard" />
						</ListItemLink>

						<ListItemLink to="/klijenti">
							<PeopleAltRoundedIcon className={classes.icon} fontSize="small" />
							<ListItemText className={classes.item} primary="Klijenti" />
						</ListItemLink>

						<ListItemLink to="/automobili">
							<DriveEtaRoundedIcon className={classes.icon} fontSize="small" />
							<ListItemText className={classes.item} primary="Automobili" />
						</ListItemLink>

						<ListItemLink to="/servisni-nalozi">
							<DescriptionRoundedIcon
								className={classes.icon}
								fontSize="small"
							/>
							<ListItemText
								className={classes.item}
								primary="Servisni Nalozi"
							/>
						</ListItemLink>

						<ListItemLink to="/radni-nalozi">
							<BuildRoundedIcon className={classes.icon} fontSize="small" />
							<ListItemText
								className={classes.item}
								primary="Aktivni Radni Nalozi"
							/>
						</ListItemLink>

						<ListItemLink to="/zakazani-termini">
							<EventAvailableRoundedIcon
								className={classes.icon}
								fontSize="small"
							/>
							<ListItemText
								className={classes.item}
								primary="Zakazani Termini"
							/>
						</ListItemLink>

						<ListItemLink to="/racuni">
							<ReceiptRoundedIcon className={classes.icon} fontSize="small" />
							<ListItemText className={classes.item} primary="Računi" />
						</ListItemLink>

						<ListItemLink to="/blog">
							<CreateRoundedIcon className={classes.icon} fontSize="small" />
							<ListItemText className={classes.item} primary="blog" />
						</ListItemLink>

						<ListItemLink to="/poruke">
							<Mail className={classes.icon} fontSize="small" />
							<ListItemText className={classes.item} primary="Poruke" />
							{unreadMessagesNumber !== 0 && (
								<div className={classes.unreadMessagesDiv}>
									<Typography>
										{unreadMessagesNumber !== 0 && unreadMessagesNumber}
									</Typography>
								</div>
							)}
						</ListItemLink>
						<ListItemLink to="/adminpanel">
							<AssignmentInd className={classes.icon} fontSize="small" />
							<ListItemText className={classes.item} primary="Admin Panel" />
						</ListItemLink>
						<Divider style={{ background: 'rgba(255,255,255,0.3)' }} />
					</List>
				</div>
			</Drawer>
		</div>
	);
};
