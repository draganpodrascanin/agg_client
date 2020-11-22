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
import DeleteIcon from '@material-ui/icons/Delete';
import DateFnsUtils from '@date-io/date-fns';
import dayjs from 'dayjs';
import { Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getExpensesAction } from '../redux/actions/expensesActions';
import { AddCircle } from '@material-ui/icons';
import { ExpenseFormModal } from './ExpenseFormModal';
import { ExpensesForm } from './ExpensesForm';

const useStyle = makeStyles({
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
		active: {
			border: 'none',
		},
	},
});

export const ExpenseTable = () => {
	const classes = useStyle();
	const dispatch = useDispatch();
	const expenses = useSelector((state) => state.expenses);
	const [fromDate, setFromDate] = useState(
		dayjs(new Date()).subtract(1, 'week')
	);
	const [toDate, setToDate] = useState(dayjs(new Date()).add(1, 'day'));
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		dispatch(getExpensesAction(fromDate, toDate));
	}, [dispatch, fromDate, toDate]);

	const handleFromDateChande = (date) => {
		setFromDate(date);
	};
	const handleToDateChande = (date) => {
		setToDate(date);
	};

	const handleModalOpen = () => {
		setModalOpen(!modalOpen);
	};

	const renderExpenses = expenses.map((expense) => {
		return (
			<TableRow key={expense.id}>
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
					<ExpensesForm />
				</div>
			</ExpenseFormModal>

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
						<TableRow>
							<TableCell>Opis</TableCell>
							<TableCell align="right">Iznos</TableCell>
							<TableCell align="right">Datum</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{renderExpenses}</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
