import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	textImportant: {
		color: theme.palette.primary.dark,
	},
}));

const Car = ({ car }) => {
	const classes = useStyles();
	if (!car) return <Typography variant="h4">Nepoznat Automobil..</Typography>;
	return (
		<section>
			<Typography variant="h4" component="h3">
				{car.carBrand} {car.carModel} {car.productionYear}
			</Typography>
			<Typography variant="body1">Kilometraža: {car.milage}</Typography>
			<Typography variant="body1">
				Registracija:{' '}
				<span className={classes.textImportant}>
					{car.registration.toUpperCase()}
				</span>
			</Typography>
			<Typography variant="body1">
				Motor: <span className={classes.textImportant}>{car.engine}</span>
			</Typography>
			<Typography variant="body1">
				Vlasnik:{' '}
				<span className={classes.textImportant}>
					{car.user.firstName} {car.user.lastName}
				</span>
			</Typography>
			<Typography variant="body1">
				Broj Telefona:{' '}
				<a
					href={`tel:${car.user.phoneNumber}`}
					className={classes.textImportant}
				>
					{car.user.phoneNumber}
				</a>
			</Typography>
			<Typography variant="body1">
				Email:{' '}
				<a href={`mailto:${car.user.email}`} className={classes.textImportant}>
					{car.user.email}
				</a>
			</Typography>
		</section>
	);
};

Car.propTypes = {
	car: PropTypes.object,
};

export default Car;
