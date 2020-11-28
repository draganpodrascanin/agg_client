import { GET_JOBCONCLUSIONS_SAGA } from './action-types';
import dayjs from 'dayjs';

export const getJobConclusionsAction = (fromDate, toDate) => {
	return {
		type: GET_JOBCONCLUSIONS_SAGA,
		payload: {
			fromDate: dayjs(fromDate).format('YYYY-MM-DD'),
			toDate: dayjs(toDate).format('YYYY-MM-DD'),
		},
	};
};
