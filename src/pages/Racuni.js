import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Invoices from '../components/Invoices';

const useStyles = makeStyles((theme) => ({
	heading: {
		marginTop: 20,
	},
}));

const Racuni = () => {
	const classes = useStyles();

	return (
		<Container>
			<Typography className={classes.heading} variant="h2" component="h1">
				Računi
			</Typography>
			<Invoices />
		</Container>
	);
};

export default Racuni;
