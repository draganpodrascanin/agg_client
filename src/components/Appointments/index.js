import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core';
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppointmentCards from './AppointmentCards';
import { getAppointmentsAction } from '../../redux/actions/appointmentActions';
import { LoadingModal } from '../UI/LoadingModal';
import { SuccessSnackbar } from '../UI/SuccessSnackbar';
import { ErrorSnackbar } from '../UI/ErrorSnackbar';

const useStyles = makeStyles((theme) => ({
	datesContainer: {
		display: 'flex',
		margin: '20px 0',
	},
}));

const Appointments = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const appointments = useSelector((state) => state.appointments);

	const [selectedFromDate, setSelectedFromDate] = useState(
		dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD')
	);
	const [selectedToDate, setSelectedToDate] = useState(
		dayjs(new Date()).add(1, 'day').format('YYYY-MM-DD')
	);

	const handleFromDateChange = (date) => {
		setSelectedFromDate(dayjs(date).format('YYYY-MM-DD'));
	};

	const handleToDateChange = (date) => {
		setSelectedToDate(dayjs(date).format('YYYY-MM-DD'));
	};

	useEffect(() => {
		console.log('state dates => ', selectedFromDate, selectedToDate);

		dispatch(getAppointmentsAction(selectedFromDate, selectedToDate));
	}, [dispatch, selectedFromDate, selectedToDate]);

	return (
		<div>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<div className={classes.datesContainer}>
					<KeyboardDatePicker
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy"
						margin="normal"
						label="Datum od:"
						value={selectedFromDate}
						onChange={handleFromDateChange}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
						style={{ marginRight: 10 }}
					/>

					<KeyboardDatePicker
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy"
						margin="normal"
						label="Datum do:"
						value={selectedToDate}
						onChange={handleToDateChange}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
				</div>
			</MuiPickersUtilsProvider>
			<AppointmentCards appointments={appointments} />

			{/*  UI  */}
			<LoadingModal />
			<SuccessSnackbar />
			<ErrorSnackbar />
		</div>
	);
};

export default Appointments;