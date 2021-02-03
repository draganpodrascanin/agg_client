import {
	Button,
	InputAdornment,
	makeStyles,
	MenuItem,
	TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoicesAction } from '../../redux/actions/invoiceActions';
import InvoiceTable from './InvoiceTable';

const useStyles = makeStyles((theme) => ({
	searchContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		marginTop: 50,
	},
	searchField: {
		marginRight: 10,
	},
	paginationContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		margin: '30px 0',
	},
	headContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	limitField: {
		width: 170,
	},
}));

const Invoices = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState('');

	const limitOptions = [10, 20, 50, 100];

	const handleLimit = (e) => {
		setLimit(e.target.value);
	};

	const invoices = useSelector((state) => state.invoices);

	useEffect(() => {
		dispatch(getInvoicesAction(page, limit, search));
	}, [dispatch, page, limit, search]);

	const handlePageChange = (e, value) => {
		setPage(value);
	};

	const formik = useFormik({
		initialValues: {
			searchField: '',
		},
		onSubmit: (v) => setSearch(v.searchField),
	});

	return (
		<div>
			<div className={classes.headContainer}>
				<form
					onSubmit={formik.handleSubmit}
					className={classes.searchContainer}
				>
					<TextField
						className={classes.searchField}
						name="searchField"
						onChange={formik.handleChange}
						label="Pretraži Po Imenu Kupca"
						value={formik.values.searchField}
						onKeyPress={(e) => {
							if (e.key === 'Enter') formik.submitForm();
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search />
								</InputAdornment>
							),
						}}
					/>
					<Button
						size="small"
						variant="outlined"
						color="primary"
						onClick={() => {
							formik.submitForm();
						}}
					>
						Pretraži
					</Button>
				</form>

				<TextField
					className={classes.limitField}
					value={limit}
					onChange={handleLimit}
					label="Prikaza Po Stranici"
					select
				>
					{limitOptions.map((opt) => (
						<MenuItem key={opt} value={opt}>
							{opt}
						</MenuItem>
					))}
				</TextField>
			</div>
			{/*----------------TABLE---------------------- */}
			<InvoiceTable invoices={invoices.invoices} />
			{/*-------------PAGINATION-------------------- */}
			<div className={classes.paginationContainer}>
				<Pagination
					style={{ marginBottom: 20 }}
					color="primary"
					count={Math.ceil(invoices.count / limit)}
					onChange={handlePageChange}
					page={page}
				/>
			</div>
		</div>
	);
};

export default Invoices;
