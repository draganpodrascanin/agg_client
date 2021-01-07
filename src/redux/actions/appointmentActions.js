import dayjs from 'dayjs';
import { GET_APPOINTMENTS_SAGA } from './action-types';

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
