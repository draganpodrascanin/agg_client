import {
	Button,
	Card,
	CardActionArea,
	Grid,
	InputAdornment,
	makeStyles,
	MenuItem,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarsAction } from '../../redux/actions/carActions';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	cardContainer: {
		marginTop: 20,
		// padding: '20px',
	},
	searchContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: 50,
	},
	paginationContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		margin: '30px 0',
	},
	card: {
		padding: '30px 20px',
		height: '100%',
	},
	cardHeading: {
		color: theme.palette.text.primary,
		fontWeight: 600,
	},
	registration: {
		fontWeight: 300,
		// letterSpacing: 1,
		color: theme.palette.primary.dark,
	},
	attentionText: {
		color: theme.palette.primary.dark,
	},
	svgIcon: {
		fontSize: 30,
		padding: '0 0',
		margin: '0 0 -6px 0',
		boxSizing: 'content-box',
		color: theme.palette.primary.dark,
	},
}));

export const CarCards = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const cars = useSelector((state) => state.cars);

	const [searchedTerm, setSearchedTerm] = useState('');
	const [page, setPage] = useState(1);
	const [searchLimit, setSearchLimit] = useState(12);

	useEffect(() => {
		dispatch(getCarsAction(page, searchLimit, searchedTerm));
	}, [dispatch, page, searchLimit, searchedTerm]);

	const formik = useFormik({
		initialValues: {
			search: '',
		},
		onSubmit: (val) => {
			setSearchedTerm(val.search);
		},
	});

	const handleSearchLimit = (e) => {
		setSearchLimit(e.target.value);
	};

	const handlePageChange = (e, value) => {
		setPage(value);
	};

	const limitOptions = [12, 24, 36, 48, 120];

	const renderCards = cars.cars.map((car) => (
		<Grid key={car.id} item lg={3} sm={6} xs={12}>
			<Card>
				<CardActionArea
					className={classes.card}
					onClick={() => history.push(`/automobili/${car.id}`)}
				>
					<Typography
						variant="h5"
						component="h4"
						className={classes.cardHeading}
					>
						<DriveEtaIcon className={classes.svgIcon} />
						{car.carBrand} {car.carModel}{' '}
					</Typography>
					<Typography>
						Godina proizvodnje:{' '}
						<span className={classes.attentionText}>
							{dayjs(car.productionYear).format('YYYY')}
						</span>
					</Typography>
					<Typography variant="body1">
						Registracija:
						<span className={classes.registration}>
							{'  '}
							{car.registration.toUpperCase()}
						</span>
					</Typography>
					<Typography>
						Motor: <span className={classes.attentionText}>{car.engine}</span>
					</Typography>
					<Typography>
						Kilometraža:{' '}
						<span className={classes.attentionText}>{car.milage}</span>
					</Typography>
					<Typography>
						Vlasnik:{' '}
						<span className={classes.attentionText}>
							{car.user ? `${car.user.firstName} ${car.user.lastName}` : '-'}
						</span>
					</Typography>
				</CardActionArea>
			</Card>
		</Grid>
	));

	return (
		<>
			{/* ======================------------------SEARCH FORM-------------------------------========================= */}
			<div className={classes.searchContainer}>
				<form className={classes.searchForm} onSubmit={formik.handleSubmit}>
					<TextField
						onChange={formik.handleChange}
						value={formik.values.search}
						style={{ marginRight: 5 }}
						name="search"
						placeholder="proizv. / model / reg."
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
				<TextField value={searchLimit} onChange={handleSearchLimit} select>
					{limitOptions.map((opt) => (
						<MenuItem key={opt} value={opt}>
							{opt}
						</MenuItem>
					))}
				</TextField>
			</div>

			{/*-------------------CARDS-------------------  */}
			<Grid className={classes.cardContainer} container spacing={3}>
				{renderCards}
			</Grid>

			{/*-------------PAGINATION-------------------- */}
			<div className={classes.paginationContainer}>
				<Pagination
					style={{ marginBottom: 20 }}
					color="primary"
					count={Math.ceil(cars.count / searchLimit)}
					onChange={handlePageChange}
					page={page}
				/>
			</div>
		</>
	);
};
