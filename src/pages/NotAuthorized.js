import {
	Button,
	Container,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
	heading: {
		display: 'block',
		textAlign: 'center',
		marginTop: '30px',
		marginBottom: '50px',
	},
	span: {
		marginBottom: '20px',
	},
	item: {
		marginBottom: 5,
		'&:not(:last-child)': { marginRight: '5px' },
	},
});

export const NotAuthorizedPage = () => {
	const classes = useStyle();
	const admin = useSelector((state) => state.admin);

	const renderAllowedRoutes = () => {
		const allowed = [];
		if (admin.role === 'admin') {
			allowed.push({ path: '/', name: 'Dashboard' });
			allowed.push({ path: '/klijenti', name: 'Klijenti' });
			allowed.push({ path: '/automobili', name: 'Automobili' });
			allowed.push({ path: '/servisni-nalozi', name: 'Servisni Nalozi' });
			allowed.push({ path: '/radni-nalozi', name: 'Radni Nalozi' });
			allowed.push({ path: '/zakazani-termini', name: 'Zakazani Termini' });
			allowed.push({ path: '/racuni', name: 'Racuni' });
		} else if (admin.role === 'mechanic') {
			allowed.push({ path: '/klijenti', name: 'Klijenti' });
			allowed.push({ path: '/automobili', name: 'Automobili' });
			allowed.push({ path: '/servisni-nalozi', name: 'Servisni Nalozi' });
			allowed.push({ path: '/radni-nalozi', name: 'Radni Nalozi' });
			allowed.push({ path: '/zakazani-termini', name: 'Zakazani Termini' });
			allowed.push({ path: '/racuni', name: 'Računi' });
		} else if (admin.role === 'blogger') {
			allowed.push({ path: '/blog', name: 'Blog' });
			allowed.push({ path: '/slike', name: 'Slike' });
		}

		return (
			<Grid container align="center" justify="center">
				{allowed.map((field) => {
					return (
						<Grid key={field.path} className={classes.item}>
							<Button
								component={Link}
								to={field.path}
								variant="outlined"
								color="secondary"
							>
								{field.name}
							</Button>
						</Grid>
					);
				})}
			</Grid>
		);
	};

	return (
		<Container>
			<Typography
				className={classes.heading}
				component="h1"
				variant="h3"
				color="primary"
			>
				Nemate dozvolu za pristup.
			</Typography>
			<Typography className={classes.span} align="center">
				vratite se na neku od stranica
			</Typography>
			{renderAllowedRoutes()}
		</Container>
	);
};
