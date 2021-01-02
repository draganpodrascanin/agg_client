import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getWorkOrderAction } from '../../../redux/actions/workOrderActions';
import { ErrorSnackbar } from '../../UI/ErrorSnackbar';
import { LoadingModal } from '../../UI/LoadingModal';
import { SuccessSnackbar } from '../../UI/SuccessSnackbar';
import { Car } from './Car';

const useStyles = makeStyles((theme) => ({}));

const Nalog = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const workOrderId = useParams().id;
	const workOrder = useSelector((state) => state.workOrder);

	useEffect(() => {
		dispatch(getWorkOrderAction(workOrderId));
	}, [dispatch, workOrderId]);

	console.log(workOrder);

	return (
		<>
			<Car car={workOrder.car} />

			{/*-----------------UI-------------------------- */}
			<LoadingModal />
			<SuccessSnackbar />
			<ErrorSnackbar />
		</>
	);
};

export default Nalog;
