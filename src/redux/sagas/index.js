import { all } from 'redux-saga/effects';
import {
	watchGetCurrentAdminSaga,
	watchLoginSaga,
	watchLogoutSaga,
} from './authSaga';
import { watchCreateCarAndSetOwnerSaga } from './carSaga';
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
	]);
}

export default rootSaga;
