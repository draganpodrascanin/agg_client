import { Button, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getWorkOrderAction } from '../../../redux/actions/workOrderActions';
import CustomModal from '../../CustomModal';
import { ErrorSnackbar } from '../../UI/ErrorSnackbar';
import { LoadingModal } from '../../UI/LoadingModal';
import { SuccessSnackbar } from '../../UI/SuccessSnackbar';
import Car from './Car';
import Exam from './Exam';
import JobConclusion from './JobConclusion';
import JobTickets from './JobTickets';
import Reception from './Reception';
import CreateCarReception from '../../Forms/CarReception';
import CeateCarExamForm from '../../Forms/CarExam';
import CreateJobTicketForm from '../../Forms/JobTicket';

const useStyles = makeStyles((theme) => ({
	createButtonsContainer: {
		display: 'flex',
		position: 'relative',
		top: -25,
	},
	createButton: {
		background: theme.palette.warning.main,
		color: '#fff',

		'&:hover': {
			background: theme.palette.warning.light,
		},

		'&:not(:last-child)': {
			marginRight: 5,
		},
	},
	buttonSuccess: {
		color: '#fff',
		background: theme.palette.primary.dark,

		'&:hover': {
			background: theme.palette.primary.light,
		},
	},
}));

const Nalog = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const workOrderId = useParams().id;
	const workOrder = useSelector((state) => state.workOrder);

	//-----------------------------------------------------------------------------
	const [openCreateReceptionModal, setOpenCreateReceptionModal] = useState(
		false
	);

	const handleCreateReceptionModal = () => {
		setOpenCreateReceptionModal(!openCreateReceptionModal);
	};
	//-----------------------------------------------------------------------------
	const [openCreateCarExamModal, setOpenCreateCarExamModal] = useState(false);

	const handleCreateCarExamModal = () => {
		setOpenCreateCarExamModal(!openCreateCarExamModal);
	};
	//-----------------------------------------------------------------------------
	const [openJobTicketFormModal, setOpenJobTicketFormModal] = useState(false);

	const handleOpenJobTicketFormModal = () => {
		setOpenJobTicketFormModal(!openJobTicketFormModal);
	};

	//-----------------------------------------------------------------------------
	useEffect(() => {
		dispatch(getWorkOrderAction(workOrderId));
	}, [dispatch, workOrderId]);

	return (
		<>
			<div className={classes.createButtonsContainer}>
				{/*-----------------CREATE CAR RECEPTION MODAL FORM -------------------- */}
				<CustomModal
					open={openCreateReceptionModal}
					onClose={handleCreateReceptionModal}
				>
					<CreateCarReception />
				</CustomModal>

				{/*-------------------CREATE CAR EXAM MODAL FORM ------------------------ */}
				<CustomModal
					open={openCreateCarExamModal}
					onClose={handleCreateCarExamModal}
				>
					<CeateCarExamForm />
				</CustomModal>
				{/*-------------------CREATE JOB TICKET MODAL FORM ------------------------ */}
				<CustomModal
					open={openJobTicketFormModal}
					onClose={handleOpenJobTicketFormModal}
				>
					<CreateJobTicketForm />
				</CustomModal>

				{/*---------------------------------------------------------------------- */}

				<Button
					className={classes.createButton}
					startIcon={<Add />}
					size="small"
					variant="contained"
					color="inherit"
					onClick={handleCreateReceptionModal}
				>
					Prijem
				</Button>
				<Button
					className={classes.createButton}
					startIcon={<Add />}
					size="small"
					variant="contained"
					color="inherit"
					onClick={handleCreateCarExamModal}
				>
					Pregled
				</Button>
				<Button
					className={classes.createButton}
					startIcon={<Add />}
					size="small"
					variant="contained"
					color="inherit"
					onClick={handleOpenJobTicketFormModal}
				>
					Radni Nalog
				</Button>
				<Button
					className={classes.buttonSuccess}
					size="small"
					variant="contained"
				>
					Zaključi Servisni Nalog
				</Button>
			</div>

			{/*-----------------SECTIONS----------------------*/}
			<Car car={workOrder.car} />
			<Reception reception={workOrder.carReception} />
			<Exam exam={workOrder.carExam} />
			<JobTickets jobTickets={workOrder.jobTickets} />
			<JobConclusion jobConclusion={workOrder.jobConclusion} />

			{/*-----------------UI-------------------------- */}
			<LoadingModal />
			<SuccessSnackbar />
			<ErrorSnackbar />
		</>
	);
};

export default Nalog;
