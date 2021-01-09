import {
	CREATE_JOB_TICKET_SAGA,
	EDIT_JOB_TICKET_SAGA,
	GET_JOB_TICKETS_SAGA,
} from './action-types';

export const createJobTicketAction = (workOrderId, ticket, status) => ({
	type: CREATE_JOB_TICKET_SAGA,
	payload: {
		workOrderId,
		ticket,
		status,
	},
});

export const editJobTicketAction = (jobTicketId, status, ticket) => ({
	type: EDIT_JOB_TICKET_SAGA,
	payload: {
		jobTicketId,
		status,
		ticket,
	},
});

export const getJobTicketsAction = () => ({ type: GET_JOB_TICKETS_SAGA });
