import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import dayjs from 'dayjs';
import { Button, Modal, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
	createExpenseAction,
	getExpensesAction,
	updateExpenseAction,
	deleteExpenseAction,
} from '../redux/actions/expensesActions';
import { AddCircle } from '@material-ui/icons';
import { ExpenseFormModal } from './ExpenseFormModal';
import { ExpensesForm } from './ExpensesForm';

const useStyle = makeStyles((theme) => ({
	datePickerContainer: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		margin: '0 8px 12px 8px',
	},
	table: {
		margin: 8,
	},
	modal: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		background: '#fff',
		padding: '30px 50px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		border: 'none',
		'&:active': {
			border: 'none',
		},
	},
	tableRow: {
		'&:hover': {
			backgroundColor: 'rgba(0,0,0,0.05)',
			cursor: 'pointer',
		},
	},
	tableHead: {
		backgroundColor: '#000',
	},
}));

export const ExpenseTable = () => {
	const classes = useStyle();
	const dispatch = useDispatch();
	const expenses = useSelector((state) => state.expenses);
	const [fromDate, setFromDate] = useState(
		dayjs(new Date()).subtract(1, 'week')
	);
	const [toDate, setToDate] = useState(dayjs(new Date()));
	const [modalOpen, setModalOpen] = useState(false);
	const [activeExpense, setActiveExpense] = useState({
		id: '',
		description: '',
		date: '',
		amount: null,
		active: false,
	});

	useEffect(() => {
		dispatch(getExpensesAction(fromDate, toDate));
	}, [dispatch, fromDate, toDate]);

	const handleFromDateChande = (date) => {
		setFromDate(date);
	};
	const handleToDateChande = (date) => {
		setToDate(date);
	};

	const resetTableDates = () => {
		setToDate(dayjs(new Date()));
		setFromDate(dayjs(dayjs(new Date()).subtract(1, 'week')));
	};

	const handleModalOpen = () => {
		setModalOpen(!modalOpen);
	};

	const handleCreateExpenseSubmit = (values) => {
		dispatch(
			createExpenseAction(values.description, values.amount, values.date)
		);
		setModalOpen(false);
		resetTableDates();
	};

	const handleActiveEnxpense = (description, date, amount, id) => {
		setActiveExpense({ description, date, amount, id, active: true });
	};
	const handleActiveExpenseModalClose = () => {
		setActiveExpense({
			id: '',
			description: '',
			date: '',
			amount: null,
			active: false,
		});
	};

	const handleUpdateExpenseFormSubmit = (values) => {
		dispatch(
			updateExpenseAction(
				values.description,
				values.amount,
				values.date,
				activeExpense.id
			)
		);
		setActiveExpense({
			id: '',
			description: '',
			date: '',
			amount: null,
			active: false,
		});
	};

	const handleDelete = () => {
		dispatch(deleteExpenseAction(activeExpense.id));
		setActiveExpense({
			id: '',
			description: '',
			date: '',
			amount: null,
			active: false,
		});
	};

	const renderExpenses = expenses.map((expense) => {
		return (
			<TableRow
				className={classes.tableRow}
				onClick={() =>
					handleActiveEnxpense(
						expense.description,
						dayjs(expense.createdAt).format('YYYY-MM-DD'),
						expense.amount,
						expense.id
					)
				}
				key={expense.id}
			>
				<TableCell component="th" scope="row">
					{expense.description}
				</TableCell>
				<TableCell align="right"> {expense.amount} </TableCell>
				<TableCell align="right">
					{dayjs(expense.createdAt).format('DD/MM/YYYY')}
				</TableCell>
			</TableRow>
		);
	});

	return (
		<>
			<ExpenseFormModal modalOpen={modalOpen} handleModalOpen={handleModalOpen}>
				<div className={classes.modal}>
					<Typography variant="h4" component="h3">
						DODAJ TROŠAK
					</Typography>
					<ExpensesForm onSubmit={handleCreateExpenseSubmit} />
				</div>
			</ExpenseFormModal>

			<Modal
				open={activeExpense.active}
				onClose={handleActiveExpenseModalClose}
			>
				<div className={classes.modal}>
					<ExpensesForm
						date={activeExpense.date}
						description={activeExpense.description}
						amount={activeExpense.amount}
						onSubmit={handleUpdateExpenseFormSubmit}
						handleDelete={handleDelete}
						update
					/>
				</div>
			</Modal>

			<div style={{ display: 'flex', alignItems: 'flex-end' }}>
				<Typography
					style={{ marginTop: 40, marginRight: 15 }}
					variant="h5"
					component="h2"
				>
					Troškovi:
				</Typography>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					startIcon={<AddCircle />}
					onClick={handleModalOpen}
				>
					Dodaj Trošak
				</Button>
			</div>
			<div className={classes.datePickerContainer}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy"
						margin="normal"
						label="Datum od"
						value={fromDate}
						onChange={handleFromDateChande}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
				</MuiPickersUtilsProvider>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy"
						margin="normal"
						label="Datum do"
						value={toDate}
						onChange={handleToDateChande}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
				</MuiPickersUtilsProvider>
			</div>
			<TableContainer className={classes.table} component={Paper}>
				<Table>
					<TableHead>
						<TableRow style={{ backgroundColor: '#1e7be2' }}>
							<TableCell style={{ color: '#fff' }}>OPIS</TableCell>
							<TableCell style={{ color: '#fff' }} align="right">
								IZNOS
							</TableCell>
							<TableCell style={{ color: '#fff' }} align="right">
								DATUM
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{renderExpenses}</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
