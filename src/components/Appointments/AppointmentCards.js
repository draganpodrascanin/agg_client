import React from 'react';
import {
	Card,
	CardContent,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const useStyles = makeStyles((theme) => ({
	container: {
		flexGrow: 1,
	},
	card: {
		width: '100%',
	},
}));

const AppointmentCards = ({ appointments }) => {
	const classes = useStyles();

	/*---------------- NO APPOINTMENTS --------------------*/
	if (!appointments || !appointments[0])
		return (
			<Typography variant="h4" component="h3">
				Nema zakazanih termina..
			</Typography>
		);

	return (
		<Grid className={classes.container} container spacing={3}>
			{appointments &&
				appointments[0] &&
				appointments.map((ap) => (
					<Grid item lg={4} sm={6} xs={12}>
						<Card className={classes.card}>
							<CardContent>
								<Typography variant="h5" component="h4">
									{ap.name}
								</Typography>

								<Typography variant="subtitle1" color="secondary" component="p">
									{dayjs(ap.datetime).format('DD.MM.YYYY HH:MM')}
								</Typography>

								<Typography variant="body2" color="text" component="p">
									{ap.car.toUpperCase()}
								</Typography>

								<Typography variant="body2" color="text" component="p">
									{ap.phoneNumber}
								</Typography>

								<Typography variant="body2" color="textSecondary" component="p">
									{ap.note}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
		</Grid>
	);
};

AppointmentCards.propTypes = {
	appontments: PropTypes.array,
};

export default AppointmentCards;
