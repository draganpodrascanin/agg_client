import {
	Button,
	CircularProgress,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearWorkOrdersAction,
	getWorkOrdersAction,
} from '../../redux/actions/workOrderActions';

const useStyles = makeStyles((theme) => ({
	loadMoreBtn: {
		// width: 200,
		textAlign: 'center',
		margin: '0 auto',
		padding: '10px 70px',
		fontSize: '18',
		background: theme.palette.primary.light,
		borderRadius: 100,
		border: 'none',
		color: '#fff',
		fontWeight: 600,
		display: 'block',

		'&:hover': {
			background: theme.palette.primary.main,
		},
	},
	card: {
		padding: '30px 60px',
		marginBottom: 20,
	},
}));

export const WorkOrderCards = () => {
	const classes = useStyles();
	const workOrders = useSelector((state) => state.workOrders);
	const [page, setPage] = useState(1);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearWorkOrdersAction());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getWorkOrdersAction(page, 20, ''));
	}, [dispatch, page]);

	const handleLoadMore = () => {
		setPage(page + 1);
	};

	const rednerWorkOrders = workOrders.workOrders.map((workOrder) => (
		<Paper className={classes.card}>
			<Typography variant="h5">
				Servisni Nalog Otvoren:{' '}
				<span>{dayjs(workOrder.createdAt).format('DD/MM/YYYY HH:mm')}</span>
			</Typography>
			<Typography variant="body1">
				Automobil:{' '}
				<span>
					{workOrder.car.carBrand} {workOrder.car.carModel}
				</span>
			</Typography>
		</Paper>
	));

	console.log(workOrders);

	return (
		<div style={{ width: '100%', marginTop: 50 }}>
			<div>{rednerWorkOrders}</div>
			{workOrders.loading && (
				<div
					style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
				>
					<CircularProgress />
				</div>
			)}
			<Button
				className={classes.loadMoreBtn}
				disabled={workOrders.loading}
				onClick={handleLoadMore}
			>
				Učitaj još
			</Button>
		</div>
	);
};
