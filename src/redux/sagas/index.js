import { all } from 'redux-saga/effects';
import {
	watchGetCurrentAdminSaga,
	watchLoginSaga,
	watchLogoutSaga,
} from './authSaga';
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

import { watchJobConclusionSaga } from './jobConclusionsSaga';
import {
	watchCreateWorkOrderSaga,
	watchGetWorkOrdersSaga,
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
		watchJobConclusionSaga(),
		watchGetClientsSaga(),
		watchCreateClientSaga(),
		watchGetCarSuggestionSaga(),
		watchSetClientCarOwnershipSaga(),
		watchCreateCarAndSetOwnerSaga(),
		watchCreateCarSaga(),
		watchGetCarsSaga(),
		watchCreateWorkOrderSaga(),
		watchGetWorkOrdersSaga(),
	]);
}

export default rootSaga;
