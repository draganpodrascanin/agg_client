import React from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { AddCircle, Create, Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	input: {
		width: '100%',
		maxWidth: 400,
	},
}));

export const ExpensesForm = ({ description, amount, date, ...props }) => {
	const classes = useStyles();
	const formik = useFormik({
		initialValues: {
			description: description || '',
			amount: amount || '',
			date: date || dayjs(new Date()).format('YYYY-MM-DD'),
		},
		onSubmit: props.onSubmit,
	});

	return (
		<form>
			<TextField
				variant="standard"
				label="Opis Troška"
				name="description"
				onChange={formik.handleChange}
				className={classes.input}
				value={formik.values.description}
				required
			/>
			<TextField
				variant="standard"
				type="number"
				label="iznos"
				name="amount"
				onChange={formik.handleChange}
				className={classes.input}
				value={formik.values.amount}
				required
			/>
			<div style={{ display: 'flex', alignItems: 'flex-end' }}>
				<TextField
					id="date"
					label="datum"
					type="date"
					defaultValue={formik.values.date}
					className={classes.textField}
					onChange={formik.handleChange}
					InputLabelProps={{
						shrink: true,
					}}
					style={{ marginRight: 20 }}
					required
				/>
				<Button
					variant="contained"
					className={classes.btn}
					style={{
						backgroundColor: props.update ? '#ff9800' : '#1e7be2',
						color: '#fff',
					}}
					size="large"
					startIcon={props.update ? <Create /> : <AddCircle />}
					onClick={formik.handleSubmit}
				>
					{props.update ? 'Izmeni Trošak' : 'Dodaj Trošak'}
				</Button>
			</div>
			{props.update && (
				<Button
					variant="contained"
					color="secondary"
					size="large"
					startIcon={<Delete />}
					onClick={props.handleDelete}
					style={{ marginTop: 20, width: '100%' }}
				>
					OBRIŠI TROŠAK
				</Button>
			)}
		</form>
	);
};
