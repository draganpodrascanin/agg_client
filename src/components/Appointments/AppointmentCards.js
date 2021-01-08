import React, { useState } from 'react';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { CheckCircleOutlined, NotInterested } from '@material-ui/icons';
import CustomModal from '../CustomModal';
import ConfirmAppointment from '../Forms/ConfirmAppointment';
import EditAppointmentForm from '../Forms/CreateAppointment';
import { useDispatch } from 'react-redux';
import { editAppointmentAction } from '../../redux/actions/appointmentActions';

const useStyles = makeStyles((theme) => ({
	container: {
		flexGrow: 1,
	},
	card: {
		width: '100%',
		position: 'relative',
	},
	confirmIcon: {
		position: 'absolute',
		top: '50%',
		right: 30,
		transform: 'translateY(-50%)',
	},
	noShowIcon: {
		color: theme.palette.secondary.main,
		fontSize: 50,
	},
	showedUp: {
		color: theme.palette.success.main,
		fontSize: 50,
	},
}));

const AppointmentCards = ({ appointments }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [openConfirmAppointmentModal, setConfirmAppointmentModal] = useState(
		false
	);
	const [activeAppointment, setActiveAppointment] = useState({});

	const handleConfirmAppointmentModal = () => {
		setConfirmAppointmentModal(!openConfirmAppointmentModal);
	};

	const handleActiveAppontment = (newActiveAppointment) => {
		if (!newActiveAppointment) setActiveAppointment({});
		else setActiveAppointment(newActiveAppointment);
	};

	//------------------EDIT MODAL------------------------------------
	const [openEditAppointmentModal, setEditAppointmentModal] = useState(false);
	const handleEditAppointmentModal = () => {
		setEditAppointmentModal(!openEditAppointmentModal);
	};

	const onSubmitEditAppointment = (v) => {
		dispatch(
			editAppointmentAction(
				activeAppointment.id,
				undefined,
				v.name,
				v.car,
				v.note,
				v.phoneNumber,
				v.datetime
			)
		);
	};

	/*---------------- NO APPOINTMENTS --------------------*/
	if (!appointments || !appointments[0])
		return (
			<Typography variant="h4" component="h3">
				Nema zakazanih termina..
			</Typography>
		);

	return (
		<>
			{/**---------------------CONFIRM APPOINTMENT MODAL---------------------- */}
			<CustomModal
				open={openConfirmAppointmentModal}
				onClose={handleConfirmAppointmentModal}
			>
				<ConfirmAppointment appointmentId={activeAppointment.id} />
			</CustomModal>
			{/**-------------------------------------------------------------------- */}
			{/**---------------------EDIT APPOINTMENT MODAL---------------------- */}
			<CustomModal
				open={openEditAppointmentModal}
				onClose={handleEditAppointmentModal}
			>
				<EditAppointmentForm
					heading="Izmeni Zakazani Termin"
					datetime={activeAppointment.datetime}
					car={activeAppointment.car}
					name={activeAppointment.name}
					note={activeAppointment.note}
					phoneNumber={activeAppointment.phoneNumber}
					onSubmit={onSubmitEditAppointment}
				/>
			</CustomModal>
			{/**-------------------------------------------------------------------- */}

			<Grid className={classes.container} container spacing={3}>
				{appointments &&
					appointments[0] &&
					appointments.map((ap) => (
						<Grid key={ap.id} item lg={4} sm={6} xs={12}>
							<Card className={classes.card}>
								<CardContent>
									<Typography variant="h5" component="h4">
										{ap.name}
									</Typography>

									<Typography
										variant="subtitle1"
										color="secondary"
										component="p"
									>
										{dayjs(ap.datetime).format('DD.MM.YYYY HH:mm')}
									</Typography>

									<Typography variant="body2" color="textPrimary" component="p">
										{ap.car.toUpperCase()}
									</Typography>

									<Typography variant="body2" color="textPrimary" component="p">
										{ap.phoneNumber}
									</Typography>

									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										{ap.note}
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										size="small"
										color="primary"
										onClick={() => {
											handleActiveAppontment(ap);
											handleConfirmAppointmentModal();
										}}
									>
										Potvrdi Dolazak
									</Button>
									<Button
										size="small"
										color="primary"
										onClick={() => {
											handleActiveAppontment(ap);
											handleEditAppointmentModal();
										}}
									>
										izmeni
									</Button>
								</CardActions>
								<div className={classes.confirmIcon}>
									{ap.showedUp === false && (
										<NotInterested className={classes.noShowIcon} />
									)}
									{ap.showedUp === true && (
										<CheckCircleOutlined className={classes.showedUp} />
									)}
								</div>
							</Card>
						</Grid>
					))}
			</Grid>
		</>
	);
};

AppointmentCards.propTypes = {
	appontments: PropTypes.array,
};

export default AppointmentCards;
