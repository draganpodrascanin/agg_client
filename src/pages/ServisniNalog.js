import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import ServisniNalogBase from '../components/ServisniNalozi/ServisniNalog';

const useStyles = makeStyles((theme) => ({
	container: { padding: '20px 0', width: '90%' },
}));

export const ServisniNalog = () => {
	const classes = useStyles();
	let { id } = useParams();

	return (
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
	);
};
