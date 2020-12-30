import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import CarsComponent from '../components/Cars';

const useStyles = makeStyles((theme) => ({
	container: { padding: '20px 0', width: '90%' },
}));

export const Cars = () => {
	const classes = useStyles();

	return (
		<Container className={classes.container}>
			<Typography variant="h2" component="h1">
				Automobili
			</Typography>
			<CarsComponent></CarsComponent>
		</Container>
	);
};
