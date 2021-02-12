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
import MessagesAccordions from './MessagesAccordions';
import { getMessagesAction } from '../../redux/actions/messageActions';

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

const MessagePage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const messages = useSelector((state) => state.messages);

	const [searchedTerm, setSearchedTerm] = useState('');
	const [page, setPage] = useState(1);
	const [searchLimit, setSearchLimit] = useState(20);

	useEffect(() => {
		dispatch(getMessagesAction(page, searchLimit, searchedTerm));
	}, [dispatch, page, searchLimit, searchedTerm]);

	const formik = useFormik({
		initialValues: {
			search: '',
		},
		onSubmit: (val) => {
			setSearchedTerm(val.search);
			setPage(1);
		},
	});

	const handleSearchLimit = (e) => {
		setSearchLimit(e.target.value);
	};

	const handlePageChange = (e, value) => {
		setPage(value);
	};

	const limitOptions = [20, 50, 100];

	return (
		<div>
			<div className={classes.searchContainer}>
				<form onSubmit={formik.handleSubmit}>
					<TextField
						onChange={formik.handleChange}
						value={formik.values.search}
						style={{ marginRight: 5 }}
						name="search"
						placeholder="Ime"
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
			<MessagesAccordions messages={messages.messages} />
			{/*-------------PAGINATION-------------------- */}
			<div className={classes.paginationContainer}>
				<Pagination
					style={{ marginBottom: 20 }}
					color="primary"
					count={Math.ceil(messages.count / searchLimit)}
					onChange={handlePageChange}
					page={page}
				/>
			</div>
		</div>
	);
};

export default MessagePage;
