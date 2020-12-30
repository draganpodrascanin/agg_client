import {
	Button,
	CircularProgress,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core';
import {
	Build,
	CheckBox,
	DoneAll,
	FolderShared,
	Pageview,
} from '@material-ui/icons';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	clearWorkOrdersAction,
	getWorkOrdersAction,
} from '../../redux/actions/workOrderActions';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
	loadMoreBtn: {
		// width: 200,
		textAlign: 'center',
		margin: '50px auto',
		padding: '12px 90px',
		fontSize: 18,
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
		padding: '30px 20px',
		height: '100%',
		marginBottom: 50,
		cursor: 'pointer',
		borderRadius: 10,
	},
	cardHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		width: '100%',
	},
	iconIncopmlete: {
		fontSize: 50,
		color: theme.palette.success.light,
		margin: '0px 20px 0 0',
	},
	iconDone: {
		fontSize: 50,
		color: theme.palette.info.light,
		margin: '0px 20px 0 0',
	},
	link: {
		textDecoration: 'none',
		'&:active, &:visited, &:hover, &:link': {
			textDecoration: 'none',
		},
	},
	date: {
		color: theme.palette.primary.light,
		fontSize: 20,
	},
	innerContentContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		margin: '30px 0',
		width: '100%',
	},
	innerCard: {
		padding: window.innerWidth > 900 ? '50px 80px' : '20px 35px',
		width: '100%',
		background: '#ccc',
		borderRadius: 10,
		color: '#fff',
		boxShadow: '2px 4px 5px rgba(0,0,0,0.15)',

		'&:not(:last-child)': {
			marginBottom: '20px',
		},
	},
	innerCardHeading: {
		fontSize: 20,
		fontWeight: 600,
		alignContent: 'center',

		'&:not(:last-child)': { marginBottom: 20 },
	},
	carReception: {
		background: `linear-gradient(90deg, rgba(61,184,247,1) 1%,rgba(0,217,232,1)  100%)`,
	},
	carExam: {
		background: `linear-gradient(90deg, rgba(26,205,95,1) 1%, rgba(97,225,142,1) 100%)`,
	},
	jobTickets: {
		background: `linear-gradient(120deg, rgba(84,192,20,1) 1%, rgba(113,227,91,1) 100%)`,
	},
	jobConclusion: {
		background: `linear-gradient(90deg, rgba(205,161,50,1) 1%, rgba(223,188,69,1) 100%)`,
	},
	innercardIcon: {
		fontSize: 30,
		color: '#fff',
		position: 'relative',
		top: 7,
		marginRight: 7,
	},
	bigInnerText: {
		fontWeight: 300,
		color: theme.palette.text.primary,
		backgroundColor: '#fff',
		padding: '10px 20px',
		borderRadius: 10,
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
		<Link className={classes.link} to="#">
			<Paper className={classes.card}>
				<div className={classes.cardHeader}>
					{workOrder.completed ? (
						<DoneAll className={classes.iconDone} />
					) : (
						<CheckBox className={classes.iconIncopmlete} />
					)}
					<div className={classes.cardContent}>
						<Typography variant="h5">
							Servisni Nalog Otvoren:{' '}
							<span className={classes.date}>
								{dayjs(workOrder.createdAt).format('DD/MM/YYYY, HH:mm')}
							</span>
						</Typography>
						<Typography variant="body1">
							Automobil:{' '}
							<span className={classes.span}>
								{workOrder.car.carBrand} {workOrder.car.carModel}
							</span>
						</Typography>
					</div>
				</div>
				<div
					className={classes.innerContentContainer}
					style={{ padding: window.innerWidth > 900 ? '0 70px' : '0' }}
				>
					<div className={`${classes.innerCard} ${classes.carReception}`}>
						<Typography variant="h5" className={classes.innerCardHeading}>
							<FolderShared className={classes.innercardIcon} />
							{workOrder.carReception
								? `Prijem obavio: ${workOrder.carReception.adminRecived}`
								: 'Prijem još nije obavljen.'}
						</Typography>
						{workOrder.carReception && (
							<>
								<Typography
									variant="body1"
									component="p"
									style={{ marginLeft: 5 }}
								>
									Vlasnik se žali na:
								</Typography>
								<Typography variant="body2" className={classes.bigInnerText}>
									{workOrder.carReception.ownerRemarks}
								</Typography>
								<Typography
									variant="body1"
									component="p"
									style={{ marginLeft: 5, marginTop: 10 }}
								>
									Oštećenja na automobilu:
								</Typography>
								<Typography variant="body2" className={classes.bigInnerText}>
									{workOrder.carReception.carDamage}
								</Typography>
								<Typography
									variant="overline"
									component="p"
									style={{ fontSize: 16, fontWeight: 100, marginTop: 25 }}
								>
									<span style={{ fontWeight: 900 }}>Kilometraža: </span>
									{workOrder.carReception.milage}
								</Typography>
							</>
						)}
					</div>
					<div className={`${classes.innerCard} ${classes.carExam}`}>
						<Typography variant="h5" className={classes.innerCardHeading}>
							<Pageview className={classes.innercardIcon} />
							Pregled još nije obavljen.
						</Typography>
					</div>
					<div className={`${classes.innerCard} ${classes.jobTickets}`}>
						<Typography variant="h5" className={classes.innerCardHeading}>
							<Build
								className={classes.innercardIcon}
								style={{ fontSize: 22, top: 3, transform: 'rotate(90deg)' }}
							/>
							Nema trenutnih naloga za rad.
						</Typography>
					</div>
					<div className={`${classes.innerCard} ${classes.jobConclusion}`}>
						<Typography variant="h5" className={classes.innerCardHeading}>
							<CheckCircleOutlineIcon className={classes.innercardIcon} />
							Posao nije zaključen.
						</Typography>
					</div>
				</div>
			</Paper>
		</Link>
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
