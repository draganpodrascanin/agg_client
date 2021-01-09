import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import JobTickets from '../components/JobTickets';

const useStyles = makeStyles((theme) => ({
	heading: {
		marginTop: 20,
	},
}));

const RadniNalozi = () => {
	const classes = useStyles();

	return (
		<Container>
			<Typography className={classes.heading} variant="h2" component="h1">
				Aktivni Radni Nalozi
			</Typography>
			<JobTickets />
		</Container>
	);
};

export default RadniNalozi;
