import { combineReducers } from 'redux';
import { activeBlogReducer } from './activeBlogReducer';
import { activeCarReducer } from './activeCarReducer';
import { appointentsReducer } from './appointmentsReducer';
import { authReducer } from './authReducer';
import { blogsReducer } from './blogsReducer';
import carsReducer from './carsReducer';
import { carSuggestionReducer } from './carSuggestionReducer';
import { chartDataReducer } from './chartReducer';
import clientsReducer from './clientsReducer';
import expensesReducer from './expensesReducer';
import { invoicesReducer } from './invoicesReducer';
import { jobConclusionsReducer } from './jobConclusionReducer';
import { jobTicketsReducer } from './jobTicketsReducer';
import { messagesReducer } from './messagesReducer';
import UIReducer from './UIReducer';
import { warrantyReducer } from './warrantyReducer';
import { workOrderReducer } from './workOrderReducer';
import { workOrdersReducer } from './workOrdersReducer';

export const combinedReducers = combineReducers({
	admin: authReducer,
	chartData: chartDataReducer,
	expenses: expensesReducer,
	clients: clientsReducer,
	jobConclusions: jobConclusionsReducer,
	UI: UIReducer,
	carSuggestions: carSuggestionReducer,
	workOrders: workOrdersReducer,
	workOrder: workOrderReducer,
	cars: carsReducer,
	activeCar: activeCarReducer,
	appointments: appointentsReducer,
	jobTickets: jobTicketsReducer,
	warranties: warrantyReducer,
	blogs: blogsReducer,
	activeBlog: activeBlogReducer,
	invoices: invoicesReducer,
	messages: messagesReducer,
});
