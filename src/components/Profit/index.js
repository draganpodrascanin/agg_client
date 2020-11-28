import DateFnsUtils from '@date-io/date-fns';
import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobConclusionsAction } from '../../redux/actions/jobConclusionActions';

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
}));

export const Profit = () => {
	const classes = useStyle();
	const [fromDate, setFromDate] = useState(
		dayjs(new Date()).subtract(1, 'week')
	);
	const [toDate, setToDate] = useState(dayjs(new Date()));
	const dispatch = useDispatch();
	const jobConclusions = useSelector((state) => state.jobConclusions);

	useEffect(() => {
		dispatch(getJobConclusionsAction(fromDate, toDate));
	}, [dispatch, fromDate, toDate]);

	const handleFromDateChande = (date) => {
		setFromDate(date);
	};
	const handleToDateChande = (date) => {
		setToDate(date);
	};

	const renderTableContent = jobConclusions.map((jobConclusion) => {
		return (
			<TableRow key={jobConclusion.id}>
				<TableCell omponent="th" scope="row">
					{jobConclusion.workDone}
				</TableCell>
				<TableCell align="right">{jobConclusion.charged}</TableCell>
				<TableCell align="right">
					{dayjs(jobConclusion.createdAt).format('DD/MM/YYYY')}
				</TableCell>
			</TableRow>
		);
	});

	return (
		<>
			<Typography
				style={{ marginTop: 50, marginRight: 15 }}
				variant="h5"
				component="h2"
			>
				Prihodi:
			</Typography>
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
					<TableBody>{renderTableContent}</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
