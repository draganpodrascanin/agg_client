//-------------------------UI------------------------------------
export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const CLEAR_LOADING = 'CLEAR_LOADING';
export const CLEAR_SUCCESS = ' CLEAR_SUCCESS';
export const UI_ERROR = 'UI_ERROR';
export const CLEAR_UI_ERROR = 'CLEAR_UI_ERROR';
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const CLEAR_MESSAGE_RECEIVED = 'CLEAR_MESSAGE_RECEIVED';

//----------------------- AUTH ----------------------------------
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const GET_CURRENT_ADMIN_SUCCESS = 'GET_CURRENT_ADMIN_SUCCESS';
export const GET_CURRENT_ADMIN_FAIL = 'GET_CURRENT_ADMIN_FAIL';
export const LOGOUT = 'LOGOUT';

export const LOGIN_SAGA = 'LOGIN_SAGA';
export const LOGOUT_SAGA = 'LOGOUT_SAGA';
export const LOGIN_SUCCESS_SAGA = 'LOGIN_SUCCESS_SAGA';
export const LOGIN_ERROR_SAGA = 'LOGIN_ERROR_SAGA';
export const GET_CURRENT_ADMIN_SAGA = 'GET_CURRENT_ADMIN_SAGA';

//---------------------------------------------------------------
export const GET_CHART_DATA_SAGA = 'GET_CHART_DATA_SAGA';
export const GET_CHART_DATA = 'GET_CHART_DATA';
export const GET_CHART_DATA_SUCCESS = 'GET_CHART_DATA_SUCCESS';
export const GET_CHART_DATA_FAILED = 'GET_CHART_DATA_FAILED';
export const CHART_DATA_CLEAR_ERROR = 'CHART_DATA_CLEAR_ERROR';

//---------------------------------------------------------------
export const GET_EXPENSES_SAGA = 'GET_EXPENSES_SAGA';
export const GET_EXPENSES = 'GET_EXPENSES';
export const GET_EXPENSES_FAILED = 'GET_EXPENSES_FAILED';
export const CREATE_EXPENSE_SAGA = 'CREATE_EXPENSE_SAGA';
export const CREATE_EXPENSE = 'CREATE_EXPENSE';
export const CREATE_EXPENSE_ERROR = 'CREATE_EXPENSE_ERROR';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const UPDATE_EXPENSE_SAGA = 'UPDATE_EXPENSE_SAGA';
export const UPDATE_EXPENSE_ERROR = 'UPDATE_EXPENSE_ERROR';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const DELETE_EXPENSE_SAGA = 'DELETE_EXPENSE_SAGA';
export const DELETE_EXPENSE_ERROR = 'DELETE_EXPENSE_ERROR';
export const EXPENSE_ERROR = 'EXPENSE_ERROR';

//----------------------------------------------------------------
export const GET_JOBCONCLUSIONS_SAGA = 'GET_JOB_CONCLUSIONS_SAGA';
export const GET_JOBCONCLUSIONS = 'GET_JOB_CONCLUSIONS';
export const JOB_CONCLUSIONS_ERROR = 'JOB_CONCLUSIONS_ERROR';

//-----------------------------------------------------------------
export const GET_CLIENTS_SAGA = 'GET_CLIENTS_SAGA';
export const GET_CLIENTS = 'GET_CLIENTS';
export const CLIENTS_LOADING = 'CLIENTS_LOADING';
export const CLEAR_CLIENTS_LOADING = 'CLEAR_CLIENTS_LOADING';
export const CLIENTS_ERROR = 'CLIENTS_ERROR';
export const CLEAR_CLIENTS_ERROR = 'CLEAR_CLIENTS_ERROR';
export const GET_ACTIVE_CLIENT_SAGA = 'GET_ACTIVE_CLIENT_SAGA';
export const GET_ACTIVE_CLIENT = 'GET_ACTIVE_CLIENT';
export const CLEAR_ACTIVE_CLIENT = 'CLEAR_ACTIVE_CLIENT';
export const CREATE_CLIENT_SAGA = 'CREATE_CLIENT_SAGA';
export const CREATE_CLIENT = 'CREATE_CLIENT';

//-----------------------------------------------------------------
export const GET_CAR_SUGGESTIONS_SAGA = 'GET_CAR_SUGGESTIONS_SAGA';
export const GET_CAR_SUGGESTIONS = 'GET_CAR_SUGGESTIONS';
export const CLEAR_CAR_SUGGESTIONS = 'CLEAR_CAR_SUGGESTIONS';
export const CAR_SUGGESTION_LOADING = 'CAR_SUGGESTION_LOADING';
export const CLEAR_CAR_SUGGESTION_LOADING = 'CLEAR_CAR_SUGGESTION_LOADING';
export const CAR_SUGGESTION_ERROR = 'CAR_SUGGESTION_ERROR';
export const CLEAR_CAR_SUGGESTION_ERROR = 'CLEAR_CAR_SUGGESTION_ERROR';
export const CAR_SUGGESTION_OPEN = 'CAR_SUGGESTION_OPEN';
export const CAR_SUGGESTION_CLOSE = 'CAR_SUGGESTION_CLOSE';
export const SET_CLIENT_CAR_OWNERSHIP_SAGA = 'SET_CLIENT_CAR_OWNERSHIP_SAGA';
export const SET_CLIENT_CAR_OWNERSHIP = 'SET_CLIENT_CAR_OWNERSHIP';

//-----------------------------------------------------------------
export const CREATE_CAR_SAGA = 'CREATE_CAR_SAGA';
export const CREATE_CAR = 'CREATE_CAR';
export const CREATE_CAR_AND_SET_OWNER = 'CREATE_CAR_AND_SET_OWNER';
export const CREATE_CAR_AND_SET_OWNER_SAGA = 'CREATE_CAR_AND_SET_OWNER_SAGA';
export const GET_CARS_SAGA = 'GET_CARS_SAGA';
export const GET_CARS = 'GET_CARS';
export const SET_CARS_LOADING = 'SET_CARS_LOADING';
export const CLEAR_CARS_LOADING = 'CLEAR_CARS_LOADING';
export const SET_CARS_ERROR = 'SET_CARS_ERROR';
export const CLEAR_CARS_ERROR = 'CLEAR_CARS_ERROR';

//--------------------------------------------------------------------
export const CREATE_WORK_ORDERS_SAGA = 'CREATE_WORK_ORDERS_SAGA';
export const CREATE_WORK_ORDERS = 'CREATE_WORK_ORDERS';
export const GET_WORK_ORDERS_SAGA = 'GET_WORK_ORDERS_SAGA';
export const GET_WORK_ORDERS = 'GET_WORK_ORDERS';
export const GET_WORK_ORDER_SAGA = 'GET_WORK_ORDER_SAGA'; //getOne
export const GET_WORK_ORDER = 'GET_WORK_ORDER'; //getOne
export const CLEAR_WORK_ORDER = 'CLEAR_WORK_ORDER';
export const SET_WORK_ORDERS_LOADING = 'SET_WORK_ORDERS_LOADING';
export const CLEAR_WORK_ORDERS_LOADING = 'CLEAR_WORK_ORDERS_LOADING';
export const CLEAR_WORK_ORDERS = 'CLEAR_WORK_ORDERS';
export const DELETE_WORK_ORDER_SAGA = 'DELETE_WORK_ORDER_SAGA';
export const DELETE_WORK_ORDER = 'DELETE_WORK_ORDER';

//---------------------------------------------------------------------
export const CREATE_CAR_RECEPTION = 'CREATE_CAR_RECEPTION';
export const CREATE_CAR_RECEPTION_SAGA = 'CREATE_CAR_RECEPTION_SAGA';
export const EDIT_CAR_RECEPTION = 'EDIT_CAR_RECEPTION';
export const EDIT_CAR_RECEPTION_SAGA = 'EDIT_CAR_RECEPTION_SAGA';
export const DELETE_CAR_RECEPTION = 'DELETE_CAR_RECEPTION';
export const DELETE_CAR_RECEPTION_SAGA = 'DELETE_CAR_RECEPTION_SAGA';

//---------------------------------------------------------------------
export const CREATE_CAR_EXAM = 'CREATE_CAR_EXAM';
export const CREATE_CAR_EXAM_SAGA = 'CREATE_CAR_EXAM_SAGA';
export const EDIT_CAR_EXAM = 'EDIT_CAR_EXAM';
export const EDIT_CAR_EXAM_SAGA = 'EDIT_CAR_EXAM_SAGA';
export const DELETE_CAR_EXAM = 'DELETE_CAR_EXAM';
export const DELETE_CAR_EXAM_SAGA = 'DELETE_CAR_EXAM_SAGA';

//---------------------------------------------------------------------
export const GET_JOB_TICKETS = 'GET_JOB_TICKETS';
export const GET_JOB_TICKETS_SAGA = 'GET_JOB_TICKETS_SAGA';
export const CREATE_JOB_TICKET = 'CREATE_JOB_TICKET';
export const CREATE_JOB_TICKET_SAGA = 'CREATE_JOB_TICKET_SAGA';
export const EDIT_JOB_TICKET = 'EDIT_JOB_TICKET';
export const EDIT_JOB_TICKET_SAGA = 'EDIT_JOB_TICKET_SAGA';
export const DELETE_JOB_TICKET = 'DELETE_JOB_TICKET';
export const DELETE_JOB_TICKET_SAGA = 'DELETE_JOB_TICKET_SAGA';

//---------------------------------------------------------------------
export const GET_JOB_CONCLUSIONS = 'GET_JOB_CONCLUSIONS';
export const GET_JOB_CONCLUSIONS_SAGA = 'GET_JOB_CONCLUSIONS_SAGA';
export const CREATE_JOB_CONCLUSION = 'CREATE_JOB_CONCLUSION';
export const CREATE_JOB_CONCLUSION_SAGA = 'CREATE_JOB_CONCLUSION_SAGA';
export const EDIT_JOB_CONCLUSION = 'EDIT_JOB_CONCLUSION';
export const EDIT_JOB_CONCLUSION_SAGA = 'EDIT_JOB_CONCLUSION_SAGA';
export const DELETE_JOB_CONCLUSION = 'DELETE_JOB_CONCLUSION';
export const DELETE_JOB_CONCLUSION_SAGA = 'DELETE_JOB_CONCLUSION_SAGA';

//---------------------------------------------------------------------
export const GET_APPOINTMENTS_SAGA = 'GET_APPOINTMENTS_SAGA';
export const GET_APPOINTMENTS = 'GET_APPOINTMENTS';
export const CREATE_APPOINTMENT_SAGA = 'CREATE_APPOINTMENTS_SAGA';
export const CREATE_APPOINTMENT = 'CREATE_APPOINTMENTS';
export const EDIT_APPOINTMENT_SAGA = 'EDIT_APPOINTMENT_SAGA';
export const EDIT_APPOINTMENT = 'EDIT_APPOINTMENT';
export const DELETE_APPOINTMENT_SAGA = 'DELETE_APPOINTMENT_SAGA';
export const DELETE_APPOINTMENT = 'DELETE_APPOINTMENT';

//---------------------------------------------------------------------
export const GET_ACTIVE_CAR_SAGA = 'GET_ACTIVE_CAR_SAGA';
export const GET_ACTIVE_CAR = 'GET_ACTIVE_CAR';
export const CREATE_ACTIVE_CAR_SAGA = 'CREATE_ACTIVE_CARS_SAGA';
export const CREATE_ACTIVE_CAR = 'CREATE_ACTIVE_CARS';
export const EDIT_ACTIVE_CAR_SAGA = 'EDIT_ACTIVE_CAR_SAGA';
export const EDIT_ACTIVE_CAR = 'EDIT_ACTIVE_CAR';
export const DELETE_ACTIVE_CAR_SAGA = 'DELETE_ACTIVE_CAR_SAGA';
export const DELETE_ACTIVE_CAR = 'DELETE_ACTIVE_CAR';

//--------------------------------------------------------------------
export const GET_WARRANTIES = 'GET_WARRANTIES';
export const GET_WARRANTIES_SAGA = 'GET_WARRANTIES_SAGA';
export const CREATE_WARRANTY_SAGA = 'CREATE_WARRANTY_SAGA';
export const CREATE_WARRANTY = 'CREATE_WARRANTY';
export const EDIT_WARRANTY_SAGA = 'EDIT_WARRANTY_SAGA';
export const EDIT_WARRANTY = 'EDIT_WARRANTY';
export const DELETE_WARRANTY_SAGA = 'DELETE_WARRANTY_SAGA';
export const DELETE_WARRANTY = 'DELETE_WARRANTY';

//--------------------------------------------------------------------
export const GET_BLOGS_SAGA = 'GET_BLOGS_SAGA';
export const GET_BLOGS = 'GET_BLOGS';
export const GET_ACTIVE_BLOG_SAGA = 'GET_ACTIVE_BLOG_SAGA';
export const GET_ACTIVE_BLOG = 'GET_ACTIVE_BLOG';
export const CREATE_BLOG_SAGA = 'CREATE_BLOG_SAGA';
export const CREATE_BLOG = 'CREATE_BLOG';
export const EDIT_BLOG_SAGA = 'EDIT_BLOG_SAGA';
export const EDIT_BLOG = 'EDIT_BLOG';
export const DELETE_BLOG_SAGA = 'DELETE_BLOG_SAGA';
export const DELETE_BLOG = 'DELETE_BLOG';
export const PUBLISH_BLOG = 'PUBLISH_BLOG';
export const PUBLISH_BLOG_SAGA = 'PUBLISH_BLOG_SAGA';

//--------------------------------------------------------------------
export const GET_INVOICES = 'GET_INVOICES';
export const GET_INVOICES_SAGA = 'GET_INVOICES_SAGA';
export const GET_ACTIVE_INVOICE = 'GET_ACTIVE_INVOICE';
export const GET_ACTIVE_INVOICE_SAGA = 'GET_ACTIVE_INVOICE_SAGA';
export const CREATE_INVOICE = 'CREATE_INVOICE';
export const CREATE_INVOICE_SAGA = 'CREATE_INVOICE_SAGA';
export const DELETE_INVOICE_SAGA = 'DELETE_INVOICE_SAGA';
export const DELETE_INVOICE = 'DELETE_INVOICE';

//--------------------------------------------------------------------
export const GET_MESSAGES = 'GET_MESSAGES';
export const GET_MESSAGES_SAGA = 'GET_MESSAGES_SAGA';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const NEW_MESSAGE_SAGA = 'NEW_MESSAGE_SAGA';
export const UPDATE_MESSAGE_SEEN = 'UPDATE_MESSAGE_SEEN';
export const UPDATE_MESSAGE_SEEN_SAGA = 'UPDATE_MESSAGE_SEEN_SAGA';
export const GET_UNREAD_MESSAGES_NUMBER = 'GET_UNREAD_MESSAGES_NUMBER';
export const GET_UNREAD_MESSAGES_NUMBER_SAGA =
	'GET_UNREAD_MESSAGES_NUMBER_SAGA';

//-------------------------------------------------------------------
export const GET_ADMINS = 'GET_ADMIN';
export const GET_ADMINS_SAGA = 'GET_ADMIN_SAGA';
export const CREATE_ADMIN = 'CREATE_ADMIN';
export const CREATE_ADMIN_SAGA = 'CREATE_ADMIN_SAGA';
export const UPDATE_ADMIN = 'UPDATE_ADMIN';
export const UPDATE_ADMIN_SAGA = 'UPDATE_ADMIN_SAGA';
export const UPDATE_ADMIN_PASSWORD = 'UPDATE_ADMIN_PASSWORD';
export const UPDATE_ADMIN_PASSWORD_SAGA = 'UPDATE_ADMIN_PASSWORD_SAGA';
export const DELETE_ADMIN_SAGA = 'DELETE_ADMIN_SAGA';
export const DELETE_ADMIN = 'DELETE_ADMIN';
