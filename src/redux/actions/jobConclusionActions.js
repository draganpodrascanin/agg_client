import {
	CREATE_JOB_CONCLUSION_SAGA,
	EDIT_JOB_CONCLUSION_SAGA,
	GET_JOBCONCLUSIONS_SAGA,
} from './action-types';
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

export const createJobConclusionAction = (
	workOrderId,
	workDone,
	note,
	charged
) => ({
	type: CREATE_JOB_CONCLUSION_SAGA,
	payload: {
		workOrderId,
		workDone,
		note,
		charged,
	},
});

export const editJobConclusionAction = (
	jobConclusionId,
	workDone,
	note,
	charged
) => ({
	type: EDIT_JOB_CONCLUSION_SAGA,
	payload: {
		jobConclusionId,
		workDone,
		note,
		charged,
	},
});
