//-------------------------UI------------------------------------
export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const CLEAR_LOADING = 'CLEAR_LOADING';
export const CLEAR_SUCCESS = ' CLEAR_SUCCESS';
export const UI_ERROR = 'UI_ERROR';
export const CLEAR_UI_ERROR = 'CLEAR_UI_ERROR';
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
