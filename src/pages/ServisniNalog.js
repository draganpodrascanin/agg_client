import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import ServisniNalogBase from '../components/WorkOrders/WorkOrder';
import bckImg from '../images/blueNetwork.png';

const useStyles = makeStyles((theme) => ({
	body: {
		position: 'relative',
	},
	container: { padding: '20px 0', width: '90%' },
	bckImg: {
		position: 'absolute',
		height: '170vh',
		width: '100vw',
		right: '-35vw',
		top: '-69vh',
		zIndex: -1,

		'@media only screen and (max-width: 900px)': {
			display: 'none',
		},
	},
}));

export const ServisniNalog = () => {
	const classes = useStyles();
	let { id } = useParams();

	return (
		<div className={classes.body}>
			<img
				className={classes.bckImg}
				src={bckImg}
				alt="background network dots"
			/>
			<Container>
				<Header
					breadcrums={[
						{ name: 'Servisni Nalozi', path: '/servisni-nalozi' },
						{ name: `Nalog ${id.slice(-9)}`, path: `/servisni-nalozi/${id}` },
					]}
				>
					Servisni Nalog
				</Header>
				<ServisniNalogBase />
			</Container>
		</div>
	);
};
