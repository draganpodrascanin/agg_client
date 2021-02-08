import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Messages from '../components/Messages';

const useStyles = makeStyles((theme) => ({
	heading: {
		marginTop: 20,
	},
}));

const Poruke = () => {
	const classes = useStyles();

	return (
		<Container>
			<Typography className={classes.heading} variant="h2" component="h1">
				Poruke
			</Typography>
			<Messages />
		</Container>
	);
};

export default Poruke;
