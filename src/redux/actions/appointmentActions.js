import dayjs from 'dayjs';
import { CREATE_APPOINTMENT_SAGA, GET_APPOINTMENTS_SAGA } from './action-types';

export const getAppointmentsAction = (fromDate, toDate) => {
	const fromD = fromDate || dayjs(new Date()).subtract(1, 'day');
	const toD = toDate || dayjs(new Date()).add(1, 'day');

	return {
		type: GET_APPOINTMENTS_SAGA,
		payload: {
			fromDate: fromD,
			toDate: toD,
		},
	};
};

export const createAppointmentAction = (
	name,
	car,
	phoneNumber,
	note,
	datetime
) => ({
	type: CREATE_APPOINTMENT_SAGA,
	payload: { name, car, phoneNumber, note, datetime },
});
