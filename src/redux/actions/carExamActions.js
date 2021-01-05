import { CREATE_CAR_EXAM_SAGA } from './action-types';

export const createCarExamAction = (workOrderId, examConclusion) => ({
	type: CREATE_CAR_EXAM_SAGA,
	payload: {
		workOrderId,
		examConclusion,
	},
});
