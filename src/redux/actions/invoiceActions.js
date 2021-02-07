import { CREATE_INVOICE_SAGA, GET_INVOICES_SAGA } from './action-types';

export const getInvoicesAction = (page, limit, search) => ({
	type: GET_INVOICES_SAGA,
	payload: { page, limit, search },
});

export const createInvoceAction = (invoice) => ({
	type: CREATE_INVOICE_SAGA,
	payload: { ...invoice },
});
