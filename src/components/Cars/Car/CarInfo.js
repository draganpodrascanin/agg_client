import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	attention: {
		color: theme.palette.primary.main,
	},
}));

const CarInfo = (props) => {
	const classes = useStyles();
	const car = props;
	console.log(car);
	//========= NO CAR ===================================================================
	if (!props.carBrand) return <Typography>Automobil nije učitan..</Typography>;
	//====================================================================================

	return (
		<>
			<Typography variant="h4" component="h2" style={{ marginLeft: -1 }}>
				{car.carBrand} {car.carModel} {car.productionYear}
			</Typography>
			<Typography variant="body1">
				Registracija:{' '}
				{car.registration && (
					<span className={classes.attention}>
						{car.registration.toUpperCase()}
					</span>
				)}
			</Typography>
			<Typography variant="body1">
				Motor:{' '}
				<span className={classes.attention}>{car.engine.toUpperCase()}</span>
			</Typography>
			{car.user && (
				<>
					<Typography variant="body1">
						Vlasnik:{' '}
						<span className={classes.attention}>
							{car.user.firstName} {car.user.lastName}
						</span>
					</Typography>
					<Typography variant="body1">
						Email:{' '}
						<a href={`mailto:${car.user.email}`} className={classes.attention}>
							{car.user.email}
						</a>
					</Typography>
					<Typography variant="body1">
						Br. Telefona:{' '}
						<a
							href={`tel:${car.user.phoneNumber}`}
							className={classes.attention}
						>
							{car.user.phoneNumber}
						</a>
					</Typography>
				</>
			)}
		</>
	);
};

CarInfo.propTypes = {
	carBrand: PropTypes.string,
	carModel: PropTypes.string,
	productionYear: PropTypes.string,
	registration: PropTypes.string,
	engine: PropTypes.string,
	user: PropTypes.object,
};

export default CarInfo;
