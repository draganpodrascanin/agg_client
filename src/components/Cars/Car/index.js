import { makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getActiveCarAction } from '../../../redux/actions/activeCarAction';
import CarInfo from './CarInfo';
import WorkOrders from './WorkOrders';

const useStyles = makeStyles((theme) => ({
	attention: {
		color: theme.palette.primary.main,
	},
}));

const Car = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const car = useSelector((state) => state.activeCar);
	const { id } = useParams();

	console.log(car);

	useEffect(() => {
		dispatch(getActiveCarAction(id));
	}, [dispatch, id]);

	return (
		<>
			<CarInfo
				carBrand={car.carBrand}
				carModel={car.carModel}
				user={car.user}
				engine={car.engine}
				registration={car.registration}
			/>
			<WorkOrders workOrders={car.workOrders} />
		</>
	);
};

export default Car;
