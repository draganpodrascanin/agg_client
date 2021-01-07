import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import AppointmentsBase from '../components/Appointments';

const useStyles = makeStyles((theme) => ({
	container: { padding: '20px 0', width: '90%' },
}));

export const Appointments = () => {
	const classes = useStyles();

	return (
		<Container className={classes.container}>
			<Typography componenet="h1" variant="h2">
				Zakazani termini
			</Typography>
			<AppointmentsBase />
		</Container>
	);
};
