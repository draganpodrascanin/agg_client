import { Container } from '@material-ui/core';
import React, { useRef, useEffect, useState } from 'react';
import { Charts } from '../components/Charts';
import { ExpenseTable } from '../components/ExpenseTable';
import { Header } from '../components/Header';

export const Dashboard = () => {
	let container = useRef(null);
	const [containerWidth, setContainerWidth] = useState(500);

	useEffect(() => {
		const handleResize = () => {
			if (container?.current?.offsetWidth)
				setContainerWidth(container.current.offsetWidth);
		};
		handleResize();

		window.addEventListener('resize', handleResize);
	}, []);

	return (
		<Container ref={container}>
			<Header breadcrums={[{ name: 'Dashboard', path: '/' }]}>Dashboard</Header>
			<Charts containerWidth={containerWidth - 40}></Charts>
			<ExpenseTable></ExpenseTable>
		</Container>
	);
};
