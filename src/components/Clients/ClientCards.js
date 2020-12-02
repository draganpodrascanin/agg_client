import {
	Button,
	CircularProgress,
	Grid,
	InputAdornment,
	makeStyles,
	MenuItem,
	Paper,
	Snackbar,
	TextField,
	Typography,
} from '@material-ui/core';
import { Add, Person, Search } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination/Pagination';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	clearSuccessAction,
	clearUiErrorAction,
} from '../../redux/actions/actionsUI';
import { getClientsAction } from '../../redux/actions/clientsActions';
import { LoadingModal } from '../LoadingModal';
import { CreateClientModal } from './CreateClientModal';

const useStyles = makeStyles((theme) => ({
	card: {
		display: 'flex',
		padding: '20px 30px',
		alignItems: 'center',
	},
	cardSide: {
		display: 'flex',
		flexDirection: 'column',
	},
	cardIcon: {
		height: '100%',
		fontSize: '70px',
	},
	phone: {
		color: theme.palette.primary.light,
		textDecoration: 'none',
		transition: 'all .2s',
		fontSize: '.9rem',
		'&:hover': {
			color: theme.palette.primary.dark,
		},
	},
	cardEmail: {
		fontSize: '1rem',
		fontWeight: 300,
		color: theme.palette.primary.light,
		textDecoration: 'none',
		transition: 'all .2s',
		margin: '-5px 0 0px 0',
		'&:hover': {
			color: theme.palette.primary.dark,
		},
	},
	searchForm: {
		// marginTop: 50,
	},
	cardsContainer: {
		marginTop: 10,
	},
	list: {
		// paddingLeft: '5px',
		listStyle: 'none',
		marginTop: 3,
	},
	listItem: {
		textDecoration: 'none',
		transition: 'all .2s',
		color: theme.palette.primary.light,

		'&:hover': {
			color: theme.palette.primary.dark,
		},
	},
	cardCar: {
		fontSize: 14,
		padding: '3px 7px',
		textDecoration: 'none',
		color: '#fff',
		backgroundColor: theme.palette.warning.main,
		whiteSpace: 'nowrap',
		margin: 3,
		'&:first-child': {
			marginLeft: 0,
		},
	},
	paginationContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		marginTop: 25,
	},
}));

export const ClientCards = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const clients = useSelector((state) => state.clients);
	const UI = useSelector((state) => state.UI);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(12);
	const [searchedTerm, setSearchedTerm] = useState('');
	const [openCreateClientModal, setCreateClientModal] = useState(false);

	useEffect(() => {
		dispatch(getClientsAction(page, limit, searchedTerm));
	}, [dispatch, page, limit, searchedTerm]);

	useEffect(() => {
		if (UI.successMessage)
			setTimeout(() => {
				if (UI.successMessage) dispatch(clearSuccessAction());
			}, 8000);
	}, [dispatch, UI.successMessage]);

	useEffect(() => {
		if (UI.uiError)
			setTimeout(() => {
				if (UI.uiError) dispatch(clearUiErrorAction());
			}, 8000);
	}, [dispatch, UI.uiError]);

	const handleCreateClientModal = () => {
		setCreateClientModal(!openCreateClientModal);
	};

	const handleSearchSubmit = (values) => {
		setSearchedTerm(values.search);
	};

	const formik = useFormik({
		initialValues: { search: '' },
		onSubmit: handleSearchSubmit,
	});

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const handleLimitChange = (e) => {
		setLimit(e.target.value);
	};

	const handleErrorSnackbarClose = () => {
		dispatch(clearUiErrorAction());
	};
	const handleSuccessSnackbarClose = () => {
		dispatch(clearSuccessAction());
	};

	const limitOptions = [12, 24, 36, 48, 120];

	const renderClients = clients.clients.map((client) => (
		<Grid key={client.id} item lg={4} sm={6} xs={12}>
			<Paper className={classes.card} style={{ height: '100%' }}>
				<Person className={classes.cardIcon} />
				<div className={classes.cardSide}>
					<Typography variant="h5" component="h3">
						{client.firstName} {client.lastName}
					</Typography>
					<p>
						email:{' '}
						<a className={classes.cardEmail} href={`mailto:${client.email}`}>
							{client.email}
						</a>
					</p>
					<p>
						broj telefona:{' '}
						<a className={classes.phone} href={`tel:${client.phoneNumber}`}>
							{client.phoneNumber}
						</a>
					</p>
					<div style={{ display: 'flex' }}>
						{client.cars.map((car) => (
							<Link
								className={classes.cardCar}
								key={car.id}
								variant="contained"
								color="primary"
								size="small"
								to="#"
							>
								{car.carBrand} {car.carModel}
							</Link>
						))}
					</div>
				</div>
			</Paper>
		</Grid>
	));

	return (
		<>
			{console.log(UI)}
			<CreateClientModal
				open={openCreateClientModal}
				close={handleCreateClientModal}
			/>
			<LoadingModal open={UI.loading} />
			<Button
				variant="outlined"
				color="default"
				startIcon={<Add />}
				onClick={handleCreateClientModal}
			>
				Registruj Klijenta
			</Button>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: 50,
					width: '100%',
				}}
			>
				<form className={classes.searchForm} onSubmit={formik.handleSubmit}>
					<TextField
						onChange={formik.handleChange}
						value={formik.values.search}
						style={{ marginRight: 5 }}
						name="search"
						placeholder="Ime / Br. Telefona"
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
						variant="outlined"
						size="small"
						color="primary"
						onClick={formik.submitForm}
					>
						Pretraži
					</Button>
				</form>
				<TextField value={limit} onChange={handleLimitChange} select>
					{limitOptions.map((opt) => (
						<MenuItem key={opt} value={opt}>
							{opt}
						</MenuItem>
					))}
				</TextField>
			</div>
			{clients.loading && (
				<div
					style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
				>
					<CircularProgress />
				</div>
			)}
			<Grid className={classes.cardsContainer} container spacing={3}>
				{renderClients}
			</Grid>
			<div className={classes.paginationContainer}>
				<Pagination
					style={{ marginBottom: 20 }}
					color="primary"
					count={Math.ceil(clients.count / limit)}
					onChange={handlePageChange}
					page={page}
				/>
			</div>
			<Snackbar open={!!UI.uiError} onClose={handleErrorSnackbarClose}>
				<Alert
					onClose={handleErrorSnackbarClose}
					severity="error"
					variant="filled"
				>
					{UI.uiError}
				</Alert>
			</Snackbar>

			<Snackbar open={!!UI.successMessage} onClose={handleSuccessSnackbarClose}>
				<Alert
					onClose={handleSuccessSnackbarClose}
					severity="success"
					variant="filled"
				>
					{UI.successMessage}
				</Alert>
			</Snackbar>
		</>
	);
};
