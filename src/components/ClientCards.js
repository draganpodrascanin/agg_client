import {
	Grid,
	List,
	ListItem,
	ListItemText,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core';
import { Person } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	card: {
		display: 'flex',
		padding: '20px 30px',
		alignItems: 'center',
	},
	cardSide: {
		display: 'flex',
		flexDirection: 'column',
	},
	cardIcon: {
		height: '100%',
		fontSize: '70px',
	},
	phone: {
		color: theme.palette.primary.light,
		textDecoration: 'none',
		transition: 'all .2s',
		fontSize: '.9rem',
		'&:hover': {
			color: theme.palette.primary.dark,
		},
	},
	cardEmail: {
		fontSize: '1rem',
		fontWeight: 300,
		color: theme.palette.primary.light,
		textDecoration: 'none',
		transition: 'all .2s',
		margin: '-5px 0 0px 0',
		'&:hover': {
			color: theme.palette.primary.dark,
		},
	},
	cardsContainer: {
		marginTop: 50,
	},
	list: {
		// paddingLeft: '5px',
		listStyle: 'none',
		marginTop: 3,
	},
	listItem: {
		textDecoration: 'none',
		transition: 'all .2s',
		color: theme.palette.primary.light,

		'&:hover': {
			color: theme.palette.primary.dark,
		},
	},
}));

export const ClientCards = () => {
	const classes = useStyles();

	const render = () => (
		<Grid item lg={4} sm={6} xs={12}>
			<Paper className={classes.card}>
				<Person className={classes.cardIcon} />
				<div className={classes.cardSide}>
					<Typography variant="h5" component="h3">
						Marko Gruicic
					</Typography>
					<p>
						email:{' '}
						<a className={classes.cardEmail} href="mailto:email@gmail.com">
							email@gmail.com
						</a>
					</p>
					<p>
						broj telefona:{' '}
						<a className={classes.phone} href="tel:+382382382">
							+38763828282
						</a>
					</p>

					<ul className={classes.list}>
						<li>
							<Link className={classes.listItem}>BMW Series 3</Link>
						</li>
						<li>
							<Link className={classes.listItem}>Audi A4</Link>
						</li>
					</ul>
				</div>
			</Paper>
		</Grid>
	);

	return (
		<Grid className={classes.cardsContainer} container spacing={3}>
			{render()}
			{render()}
			{render()}
			{render()}
			{render()}
			{render()}
			{render()}
		</Grid>
	);
};
