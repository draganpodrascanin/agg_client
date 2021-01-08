import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	attention: {
		color: theme.palette.primary.dark,
	},
	section: {
		marginTop: 15,
		paddingTop: 15,
	},
	remarksText: {
		marginLeft: 10,
		maxWidth: 600,
	},
}));

const Reception = ({ reception }) => {
	const classes = useStyles();

	if (!reception)
		return (
			<Typography style={{ marginTop: 20 }} variant="h5">
				Prijem nije obavljen.
			</Typography>
		);

	return (
		<section className={classes.section}>
			<Typography variant="h4" component="h3">
				{' '}
				Prijem
			</Typography>
			<Typography variant="body1">
				Automobil primio:{' '}
				<span className={classes.attention}> {reception.adminRecived}</span>
			</Typography>

			<Typography variant="body1">
				Kilometraža:{' '}
				<span className={classes.attention}>{reception.milage}</span>
			</Typography>

			<Typography>
				Oštećenja na automobilu:{' '}
				<span className={classes.attention}>
					{reception.carDamage ? reception.carDamage : '-'}
				</span>
			</Typography>
			<Typography variant="body1" style={{ textDecoration: 'underline' }}>
				Klijent se žali na:
			</Typography>
			<Typography variant="body2" className={classes.remarksText}>
				{reception.ownerRemarks}
			</Typography>
		</section>
	);
};

Reception.propTypes = {
	reception: PropTypes.object,
};

export default Reception;
