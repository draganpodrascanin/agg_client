const { GET_JOBCONCLUSIONS } = require('../actions/action-types');

const jobConclusionsInitialState = [];

export const jobConclusionsReducer = (
	state = jobConclusionsInitialState,
	action
) => {
	switch (action.type) {
		case GET_JOBCONCLUSIONS:
			return [...action.payload];
		default:
			return state;
	}
};
