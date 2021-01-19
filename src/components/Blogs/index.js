import { Button, makeStyles, MenuItem, TextField } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogsAction } from '../../redux/actions/blogActions';
import { ErrorSnackbar } from '../UI/ErrorSnackbar';
import { LoadingModal } from '../UI/LoadingModal';
import { SuccessSnackbar } from '../UI/SuccessSnackbar';
import BlogCards from './BlogCards';

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: 30,
	},
	searchForm: {
		display: 'flex',
	},
	paginationContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		margin: '30px 0',
	},
}));

const Blogs = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const formRef = useRef(null);
	const [page, setPage] = useState(1);
	const [searchLimit, setSearchLimit] = useState(12);
	const [searchedTerm, setSearchedTerm] = useState('');
	const blogs = useSelector((state) => state.blogs);

	const formik = useFormik({
		initialValues: {
			search: '',
		},
		onSubmit: (v) => {
			setSearchedTerm(v.search);
		},
	});

	const handleSearchLimit = (e) => {
		setSearchLimit(e.target.value);
	};

	const handlePageChange = (e, value) => {
		setPage(value);
	};

	useEffect(() => {
		dispatch(getBlogsAction(page, searchLimit, searchedTerm));
	}, [dispatch, page, searchLimit, searchedTerm]);

	const limitOptions = [12, 24, 36];

	return (
		<div className={classes.container}>
			<div
				style={{
					display: 'flex',
					alignItems: 'flex-end',
					justifyContent: 'space-between',
				}}
			>
				<form
					ref={formRef}
					className={classes.searchForm}
					onSubmit={formik.handleSubmit}
				>
					<TextField
						label="Pretraži"
						size="small"
						value={formik.values.search}
						name="search"
						onChange={formik.handleChange}
						style={{ marginRight: 10 }}
						onKeyPress={(e) => {
							if (e.key === 'Enter') formik.submitForm();
						}}
					/>
					<Button
						size="small"
						variant="contained"
						color="primary"
						style={{ alignSelf: 'flex-end' }}
						onClick={() => formik.submitForm()}
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
			<BlogCards blogs={blogs.blogs} />
			{/*-------------PAGINATION-------------------- */}
			<div className={classes.paginationContainer}>
				<Pagination
					style={{ marginBottom: 20 }}
					color="primary"
					count={Math.ceil(blogs.count / searchLimit)}
					onChange={handlePageChange}
					page={page}
				/>
			</div>
			{/*  UI  */}
			<LoadingModal />
			<SuccessSnackbar />
			<ErrorSnackbar />
		</div>
	);
};

export default Blogs;
