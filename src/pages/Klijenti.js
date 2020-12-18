import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ClientCards from '../components/Clients';

const useStyles = makeStyles((theme) => ({
	heading: {
		marginTop: 20,
	},
}));

export const Klijenti = () => {
	const classes = useStyles();

	return (
		<Container>
			<Typography className={classes.heading} variant="h2" component="h1">
				Klijenti
			</Typography>
			<ClientCards />
		</Container>
	);
};
