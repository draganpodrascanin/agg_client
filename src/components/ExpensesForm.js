import React from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	input: {
		width: '100%',
		maxWidth: 400,
		padding: '10px 0px',
	},
}));

export const ExpensesForm = () => {
	const classes = useStyles();

	const formik = useFormik({
		initialValues: {
			description: '',
			amount: '',
			date: dayjs(new Date()).format('YYYY-MM-DD'),
		},
		onSubmit: (values) => {},
	});

	console.log(formik.values.date);
	return (
		<form>
			<TextField
				variant="standard"
				label="Opis Troška"
				name="Opis Troška"
				onChange={formik.handleChange}
				className={classes.input}
			/>
			<TextField
				variant="standard"
				type="number"
				label="iznos"
				name="iznos"
				onChange={formik.handleChange}
				className={classes.input}
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
				/>
				<Button
					variant="contained"
					color="primary"
					size="large"
					startIcon={<AddCircle />}
				>
					Dodaj Trošak
				</Button>
			</div>
		</form>
	);
};
