import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { chartDataReducer } from './chartReducer';
import clientsReducer from './clientsReducer';
import expensesReducer from './expensesReducer';
import { jobConclusionsReducer } from './jobConclusionReducer';
import UIReducer from './UIReducer';

export const combinedReducers = combineReducers({
	admin: authReducer,
	chartData: chartDataReducer,
	expenses: expensesReducer,
	clients: clientsReducer,
	jobConclusions: jobConclusionsReducer,
	UI: UIReducer,
});
