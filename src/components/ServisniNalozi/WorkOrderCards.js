import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	CircularProgress,
	makeStyles,
	Typography,
} from '@material-ui/core';
import {
	Build,
	CheckBox,
	Delete,
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
	deleteWorkOrderAction,
	getWorkOrdersAction,
} from '../../redux/actions/workOrderActions';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { statusTranslate } from '../util/statusTranslate';
import Timeline from '@material-ui/icons/Timeline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteModal from '../DeleteModal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
		borderRadius: 10,
	},
	cardHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '90%',
	},
	headerLink: {
		color: '#fff',
		textDecoration: 'none',
		height: 36,
		width: 250,
		borderRadius: 5,
		background: theme.palette.primary.light,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textTransform: 'uppercase',
		marginTop: 10,
		marginRight: 5,

		boxShadow:
			'0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
		transition:
			'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

		'&:hover': {
			background: 'rgba(21, 86, 158,.85)',
			boxShadow:
				'0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
		},

		'&:active, &:visited,  &:link': {
			textDecoration: 'none',
		},
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
		padding: window.innerWidth > 900 ? '30px 45px' : '20px 35px',
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
		fontSize: 28,
		fontWeight: 600,
		alignContent: 'center',

		'&:not(:last-child)': { marginBottom: 20 },
	},
	carReception: {
		background: `linear-gradient(90deg, rgba(61,164,237,1) 1%,rgba(10,197,232,1)  100%)`,
	},
	carExam: {
		background: `linear-gradient(90deg, rgba(163,116,255,1) 0%, rgba(184,130,254,1) 100%)`,
	},
	jobTickets: {
		background: `linear-gradient(90deg, rgba(26,175,145,1) 1%, rgba(97,225,182,1) 90%)`,
	},
	jobConclusion: {
		background: `linear-gradient(90deg, rgba(225,161,50,1) 1%, rgba(243,188,69,1) 100%)`,
	},
	innercardIcon: {
		fontSize: 34,
		color: '#fff',
		position: 'relative',
		top: 7,
		marginRight: 7,
	},
	bigInnerText: {
		fontWeight: 300,
		color: theme.palette.text.primary,
		backgroundColor: '#fff',
		marginTop: 3,
		padding: '20px 32px',
		borderRadius: 10,
	},
	jobTicketsContainer: {
		display: 'flex',
		flexDirection: window.innerWidth > 900 ? 'row' : 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	jobTicket: {
		background: '#fff',
		borderRadius: 5,
		padding: '20px 35px',
		color: theme.palette.text.primary,
		margin: window.innerWidth > 900 ? '0 10px 10px 0' : '0 0 10px 0',
		width: window.innerWidth > 900 ? 'auto' : '100%',
	},
	jobTicketStatus: {
		color: '#fff',
		display: 'inline-flex',
		padding: '7px 14px',
		borderRadius: 4,
		marginBottom: 15,
	},
	jobTicketStatusSuccess: {
		background: theme.palette.success.light,
	},
	jobTicketStatusInfo: {
		background: theme.palette.warning.light,
	},
}));

export const WorkOrderCards = () => {
	const classes = useStyles();
	const workOrders = useSelector((state) => state.workOrders);
	const admin = useSelector((state) => state.admin);
	const dispatch = useDispatch();

	const [page, setPage] = useState(1);
	const [completed, setCompleted] = useState(false);

	const handleCompleted = () => {
		setCompleted(!completed);
	};

	useEffect(() => {
		dispatch(clearWorkOrdersAction());
	}, [dispatch]);

	useEffect(() => {
		dispatch(clearWorkOrdersAction());
		setPage(1);
	}, [dispatch, completed]);

	useEffect(() => {
		dispatch(getWorkOrdersAction(page, 10, '', completed));
	}, [dispatch, page, completed]);

	const handleLoadMore = () => {
		setPage(page + 1);
	};

	//--------------------------------------------------------------------------
	const [deleteWorkOrderId, setDeleteWorkOrderId] = useState('');

	const handleDeleteWorkOrderId = (id) => {
		if (typeof id !== 'string') setDeleteWorkOrderId('');
		else if (id) setDeleteWorkOrderId(id);
		else setDeleteWorkOrderId('');
	};

	const onSubmitDeletWorkOrder = () => {
		dispatch(deleteWorkOrderAction(deleteWorkOrderId));
		handleDeleteWorkOrderId();
	};

	//--------------------------------------------------------------------------

	const renderWorkOrders = workOrders.workOrders.map((workOrder) => (
		<Accordion
			key={workOrder.id}
			className={classes.card}
			style={{ marginBottom: 20 }}
		>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
								{dayjs(workOrder.createdAt).format('DD.MM.YYYY. (HH:mm)')}
							</span>
						</Typography>
						<Typography variant="body1">
							Automobil:{' '}
							<span className={classes.span}>
								{workOrder.car.carBrand} {workOrder.car.carModel}
							</span>
						</Typography>
						<div style={{ display: 'flex', alignItems: 'flex-end' }}>
							<Link
								to={`/servisni-nalozi/${workOrder.id}`}
								className={classes.headerLink}
							>
								Uđi u Nalog
							</Link>
							{(admin.role === 'admin' || admin.role === 'super-admin') && (
								<Button
									color="secondary"
									variant="contained"
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteWorkOrderId(workOrder.id);
									}}
								>
									<Delete />
								</Button>
							)}
						</div>
					</div>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<div
					className={classes.innerContentContainer}
					style={{ padding: window.innerWidth > 900 ? '0 70px' : '0' }}
				>
					<div
						className={`${classes.innerCard} ${classes.carReception}`}
						style={
							workOrder.carReception
								? {}
								: { padding: '20px 35px', marginBottom: 6 }
						}
					>
						<Typography
							variant="h4"
							className={classes.innerCardHeading}
							style={workOrder.carExam ? {} : { fontSize: 20, marginBottom: 0 }}
						>
							<FolderShared
								className={classes.innercardIcon}
								style={workOrder.carExam ? {} : { fontSize: 24, top: 3 }}
							/>
							{workOrder.carReception
								? `Prijem obavio: ${workOrder.carReception.adminRecived}`
								: 'Prijem još nije obavljen.'}
						</Typography>
						{workOrder.carReception && (
							<>
								<Typography
									variant="h6"
									component="p"
									style={{ marginLeft: 4 }}
								>
									Vlasnik se žali na:
								</Typography>
								<Typography variant="body2" className={classes.bigInnerText}>
									{workOrder.carReception.ownerRemarks}
								</Typography>
								<Typography
									variant="h6"
									component="p"
									style={{ marginLeft: 4, marginTop: 10 }}
								>
									Oštećenja na automobilu:
								</Typography>
								<Typography variant="body2" className={classes.bigInnerText}>
									{workOrder.carReception.carDamage}
								</Typography>
								<Typography
									variant="h6"
									component="p"
									style={{ fontWeight: 100, marginTop: 25 }}
								>
									Kilometraža: {workOrder.carReception.milage}
								</Typography>
							</>
						)}
					</div>
					<div
						className={`${classes.innerCard} ${classes.carExam}`}
						style={
							workOrder.carExam ? {} : { padding: '20px 35px', marginBottom: 6 }
						}
					>
						<Typography
							variant="h5"
							className={classes.innerCardHeading}
							style={
								workOrder.carExam
									? { marginBottom: 5 }
									: { fontSize: 20, marginBottom: 0 }
							}
						>
							<Pageview
								className={classes.innercardIcon}
								style={workOrder.carExam ? {} : { fontSize: 24, top: 3 }}
							/>
							{workOrder.carExam ? 'Pregled' : 'Pregled još nije obavljen.'}
						</Typography>
						{workOrder.carExam && (
							<Typography variant="body2" className={classes.bigInnerText}>
								{workOrder.carExam.examConclusion}
							</Typography>
						)}
					</div>
					<div
						className={`${classes.innerCard} ${classes.jobTickets}`}
						style={
							workOrder?.jobTickets[0]
								? {}
								: { padding: '20px 35px', marginBottom: 6 }
						}
					>
						<Typography
							variant="h5"
							className={classes.innerCardHeading}
							style={
								workOrder?.jobTickets[0]
									? {}
									: { fontSize: 20, marginBottom: 0 }
							}
						>
							<Build
								className={classes.innercardIcon}
								style={
									workOrder?.jobTickets[0]
										? { fontSize: 22, top: 3, transform: 'rotate(90deg)' }
										: { fontSize: 20, top: 3 }
								}
							/>
							{workOrder?.jobTickets[0]
								? 'Radni Nalozi'
								: 'Nema trenutnih naloga za rad.'}
						</Typography>
						{workOrder.jobTickets[0] && (
							<div className={classes.jobTicketsContainer}>
								{workOrder.jobTickets.map((ticket) => (
									<div key={ticket.id} className={classes.jobTicket}>
										<Typography
											className={`${classes.jobTicketStatus} ${
												ticket.status === 'finished'
													? classes.jobTicketStatusSuccess
													: classes.jobTicketStatusInfo
											}`}
										>
											<Timeline style={{ marginRight: 5 }} />{' '}
											{statusTranslate(ticket.status).toUpperCase()}
										</Typography>
										<Typography style={{ fontSize: 20, marginBottom: 0 }}>
											{ticket.ticket}
										</Typography>
									</div>
								))}
							</div>
						)}
					</div>
					<div
						className={`${classes.innerCard} ${classes.jobConclusion}`}
						style={
							workOrder.jobConclusion
								? {}
								: { padding: '20px 35px', marginBottom: 6 }
						}
					>
						<Typography
							variant="h5"
							className={classes.innerCardHeading}
							style={{ fontSize: 20, marginBottom: 0 }}
						>
							<CheckCircleOutlineIcon
								className={classes.innercardIcon}
								style={{ fontSize: 20, top: 3 }}
							/>
							Posao nije zaključen.
						</Typography>
					</div>
				</div>
			</AccordionDetails>
		</Accordion>
	));

	return (
		<div style={{ width: '100%', marginTop: 50 }}>
			<DeleteModal
				id={deleteWorkOrderId}
				open={!!deleteWorkOrderId}
				onClose={handleDeleteWorkOrderId}
				onSubmit={onSubmitDeletWorkOrder}
			/>
			{(admin.role === 'super-admin' || admin.role === 'admin') && (
				<FormControlLabel
					control={
						<Switch
							checked={completed}
							onChange={handleCompleted}
							name="checkedB"
							color="primary"
						/>
					}
					label="Prikaži zaključene naloge."
				/>
			)}
			<div>{renderWorkOrders}</div>
			{workOrders.loading && (
				<div
					style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
				>
					<CircularProgress />
				</div>
			)}
			{workOrders.count > workOrders.workOrders.length && (
				<Button
					className={classes.loadMoreBtn}
					disabled={workOrders.loading}
					onClick={handleLoadMore}
				>
					Učitaj još
				</Button>
			)}
		</div>
	);
};
