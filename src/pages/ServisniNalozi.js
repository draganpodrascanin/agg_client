import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import WorkOrders from '../components/WorkOrders';

const useStyles = makeStyles((theme) => ({
	heading: {
		marginTop: 20,
	},
}));

export const ServisniNalozi = () => {
	const classes = useStyles();

	return (
		<Container style={{ width: '90%' }}>
			<Typography className={classes.heading} variant="h2" component="h1">
				Servisni Nalozi
			</Typography>
			<WorkOrders />
		</Container>
	);
};
