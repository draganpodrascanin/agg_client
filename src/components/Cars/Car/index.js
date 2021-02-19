import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getActiveCarAction } from '../../../redux/actions/activeCarAction';
import { ErrorSnackbar } from '../../UI/ErrorSnackbar';
import { LoadingModal } from '../../UI/LoadingModal';
import { SuccessSnackbar } from '../../UI/SuccessSnackbar';
import CarInfo from './CarInfo';
import Warranties from './Warranties';
import WorkOrders from './WorkOrders';

const Car = () => {
	const dispatch = useDispatch();
	const car = useSelector((state) => state.activeCar);

	const { id } = useParams();

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
			<Warranties warranties={car.warranties} />

			{/*  UI  */}
			<LoadingModal />
			<SuccessSnackbar />
			<ErrorSnackbar />
		</>
	);
};

export default Car;
