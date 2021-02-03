import { GET_ACTIVE_INVOICE_SAGA, GET_INVOICES_SAGA } from './action-types';

export const getInvoicesAction = (page, limit, search) => ({
	type: GET_INVOICES_SAGA,
	payload: { page, limit, search },
});

export const getActiveInvoiceAction = (id) => ({
	type: GET_ACTIVE_INVOICE_SAGA,
	payload: { id },
});

export const getInvoicePdf = (id) => ({
	type: GET_ACTIVE_INVOICE_SAGA,
	payload: { id },
});
