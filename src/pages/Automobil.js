import { Container } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import Car from '../components/Cars/Car';

const Automobil = () => {
	let { id } = useParams();

	return (
		<Container>
			<Header
				breadcrums={[
					{ name: 'Autmobili', path: '/automobili' },
					{ name: `Automobil ${id.slice(-9)}`, path: `/automobili/${id}` },
				]}
			>
				Automobil
			</Header>
			<Car />
		</Container>
	);
};

export default Automobil;
