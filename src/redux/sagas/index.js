import { all } from 'redux-saga/effects';
import {
	watchCreateAdminSaga,
	watchDeleteAdminSaga,
	watchGetAdminsSaga,
	watchUpdateAdminPasswordSaga,
	watchUpdateAdminSaga,
} from './adminSaga';
import {
	watchCreateAppointmentsSaga,
	watchEditAppointmentsSaga,
	watchGetAppointmentsSaga,
} from './appointmentsSaga';
import {
	watchGetCurrentAdminSaga,
	watchLoginSaga,
	watchLogoutSaga,
} from './authSaga';
import {
	watchCreateBlogSaga,
	watchEditBlogSaga,
	watchGetActiveBlog,
	watchGetBlogs,
	watchPublishBlog,
} from './blogsSaga';
import { watchCreateCarExamSaga } from './carExamSaga';
import { watchCreateCarReceptionSaga } from './carReceptionSaga';
import {
	watchCreateCarAndSetOwnerSaga,
	watchCreateCarSaga,
	watchGetActiveCarSaga,
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
import { watchCreateInvoiceSaga, watchGetInvoicesSaga } from './invoicesSaga';

import {
	watchCreateJobConclusionSaga,
	watchEditJobConclusionSaga,
	watchGetJobConclusionsSaga,
} from './jobConclusionsSaga';
import {
	watchCreateJobTicketSaga,
	watchEditJobTicketSaga,
	watchGetJobTicketSaga,
} from './jobTicketSaga';
import {
	watchGetMessagesSaga,
	watchGetUnreadMessagesNumberSaga,
	watchNewMessageSaga,
	watchUpdateMessageSeenSaga,
} from './messagesSaga';
import {
	watchCreateWarrantiesSaga,
	watchDeleteWarrantySaga,
	watchEditWarrantySaga,
	watchGetWarrantiesSaga,
} from './warrantySaga';
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
		watchEditAppointmentsSaga(),
		watchGetJobTicketSaga(),
		watchGetActiveCarSaga(),
		watchGetWarrantiesSaga(),
		watchCreateWarrantiesSaga(),
		watchEditWarrantySaga(),
		watchDeleteWarrantySaga(),
		watchGetBlogs(),
		watchCreateBlogSaga(),
		watchGetActiveBlog(),
		watchEditBlogSaga(),
		watchPublishBlog(),
		watchGetInvoicesSaga(),
		watchCreateInvoiceSaga(),
		watchGetMessagesSaga(),
		watchUpdateMessageSeenSaga(),
		watchGetUnreadMessagesNumberSaga(),
		watchNewMessageSaga(),
		watchGetAdminsSaga(),
		watchCreateAdminSaga(),
		watchUpdateAdminSaga(),
		watchUpdateAdminPasswordSaga(),
		watchDeleteAdminSaga(),
	]);
}

export default rootSaga;
