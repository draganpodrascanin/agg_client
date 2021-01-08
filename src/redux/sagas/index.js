import { all } from 'redux-saga/effects';
import {
	watchCreateAppointmentsSaga,
	watchGetAppointmentsSaga,
} from './appointmentsSaga';
import {
	watchGetCurrentAdminSaga,
	watchLoginSaga,
	watchLogoutSaga,
} from './authSaga';
import { watchCreateCarExamSaga } from './carExamSaga';
import { watchCreateCarReceptionSaga } from './carReceptionSaga';
import {
	watchCreateCarAndSetOwnerSaga,
	watchCreateCarSaga,
	watchGetCarsSaga,
} from './carSaga';
import { watchGetCarSuggestionSaga } from './carSuggestionsSaga';
import { watchGetChartDataSaga } from './chartSaga';
import {
	watchCreateClientSaga,
	watchGetClientsSaga,
	watchSetClientCarOwnershipSaga,
} from './clientsSaga';
import {
	watchGetExpensesSaga,
	watchCreateExpenseSaga,
	watchUpdateExpenseSaga,
	watchDeleteExpenseSaga,
} from './expensesSaga';

import {
	watchCreateJobConclusionSaga,
	watchEditJobConclusionSaga,
	watchGetJobConclusionsSaga,
} from './jobConclusionsSaga';
import {
	watchCreateJobTicketSaga,
	watchEditJobTicketSaga,
} from './jobTicketSaga';
import {
	watchCreateWorkOrderSaga,
	watchGetWorkOrderSaga,
	watchGetWorkOrdersSaga,
	watchDeleteWorkOrderSaga,
} from './workOrderSaga';

function* rootSaga() {
	yield all([
		watchLoginSaga(),
		watchGetCurrentAdminSaga(),
		watchLogoutSaga(),
		watchGetChartDataSaga(),
		watchGetExpensesSaga(),
		watchCreateExpenseSaga(),
		watchUpdateExpenseSaga(),
		watchDeleteExpenseSaga(),
		watchGetJobConclusionsSaga(),
		watchGetClientsSaga(),
		watchCreateClientSaga(),
		watchGetCarSuggestionSaga(),
		watchSetClientCarOwnershipSaga(),
		watchCreateCarAndSetOwnerSaga(),
		watchCreateCarSaga(),
		watchGetCarsSaga(),
		watchCreateWorkOrderSaga(),
		watchGetWorkOrdersSaga(),
		watchGetWorkOrderSaga(),
		watchCreateCarReceptionSaga(),
		watchCreateCarExamSaga(),
		watchCreateJobTicketSaga(),
		watchCreateJobConclusionSaga(),
		watchEditJobTicketSaga(),
		watchEditJobConclusionSaga(),
		watchDeleteWorkOrderSaga(),
		watchGetAppointmentsSaga(),
		watchCreateAppointmentsSaga(),
	]);
}

export default rootSaga;
