import {
	GET_WORK_ORDER,
	CLEAR_WORK_ORDER,
	CREATE_CAR_RECEPTION,
	CREATE_CAR_EXAM,
	CREATE_JOB_TICKET,
	CREATE_JOB_CONCLUSION,
	EDIT_JOB_TICKET,
	EDIT_JOB_CONCLUSION,
	EDIT_CAR_EXAM,
} from '../actions/action-types';

const initialState = {
	carReception: null,
	carExam: null,
	jobTickets: [],
};

export const workOrderReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_WORK_ORDER:
			return { ...action.payload };
		case CLEAR_WORK_ORDER:
			return {};
		case CREATE_CAR_RECEPTION:
			return { ...state, carReception: action.payload };
		case CREATE_CAR_EXAM:
			return { ...state, carExam: action.payload };
		case EDIT_CAR_EXAM:
			return { ...state, carExam: action.payload };
		case CREATE_JOB_TICKET:
			return { ...state, jobTickets: [action.payload, ...state.jobTickets] };
		case EDIT_JOB_TICKET:
			const updatedJobTickets = state.jobTickets.map((ticket) => {
				if (ticket.id !== action.payload.id) return ticket;
				return action.payload;
			});
			return { ...state, jobTickets: [...updatedJobTickets] };
		case CREATE_JOB_CONCLUSION:
			return { ...state, jobConclusion: action.payload };
		case EDIT_JOB_CONCLUSION:
			return { ...state, jobConclusion: action.payload };
		default:
			return state;
	}
};
