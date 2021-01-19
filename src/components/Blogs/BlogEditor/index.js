import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import {
	Button,
	InputLabel,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import TextEditor from './TextEditor';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	loadingAction,
	clearLoadingAction,
	uiErrorAction,
} from '../../../redux/actions/actionsUI';
import { ErrorSnackbar } from '../../UI/ErrorSnackbar';
import { SuccessSnackbar } from '../../UI/SuccessSnackbar';
import { LoadingModal } from '../../UI/LoadingModal';
import { createBlogAction } from '../../../redux/actions/blogActions';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		maxWidth: 1800,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		margin: '0 auto',
	},
	item: {
		width: '40%',
		height: '100%',
		backgroundColor: '#fff',
		boxShadow: '2px 5px 12px rgba(0,0,0,0.2)',
	},
	form: {
		padding: 50,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		marginRight: 30,
	},
	blog: {
		padding: 50,
	},
	divider: {
		height: 2,
		width: 250,
		background: 'rgba(0,0,0,0.4)',
		marginBottom: 20,
		marginLeft: 1,
	},
	uploadButton: {
		color: '#fff',
		background: theme.palette.primary.main,
		alignSelf: 'flex-start',
		padding: '10px 17px',
		cursor: 'pointer',
		marginBottom: 14,
		borderRadius: 3,
		transition: 'all .2s',

		'&:hover': {
			background: theme.palette.primary.dark,
			boxShadow: theme.shadows[3],
		},

		'input[type=file][disabled] + &': {
			cursor: 'not-allowed',
			background: theme.palette.text.disabled,
		},
	},
	textField: {
		width: '100%',
		margin: '0 auto 14px auto',
	},
	deleteImageButton: {
		cursor: 'pointer',
		transition: 'all .2s',
		display: 'inline-block',
		alignSelf: 'flex-start',

		'&:hover': {
			color: theme.palette.secondary.dark,
		},
	},
	formImage: {
		width: '100%',
		height: 'auto',
	},
}));

const BlogEditor = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [image, setImage] = useState(props.image || null);
	const [thumbnail, setThumbnail] = useState(props.thumbnail || null);

	const inputImageEl = useRef(null);
	const inputThumbnailEl = useRef(null);

	const handleImageSelection = async (e, setState) => {
		const file = e.target.files[0];
		if (!file) return;

		const fd = new FormData();
		fd.append('blogImage', file, file.name);

		dispatch(loadingAction());
		try {
			const response = await axios.post('/api/v1/images/', fd);
			setState(response.data.data);
			formik.setFieldValue(`${e.target.name}Id`, response.data.data.id);
			dispatch(clearLoadingAction());
		} catch (err) {
			dispatch(clearLoadingAction());
			dispatch(uiErrorAction('Greška pri otpremanju slike na server.'));
		}
	};

	const handleImageDelete = async (e) => {
		const imageId = e.target.attributes.deleteelid.value;
		dispatch(loadingAction());

		try {
			await axios.delete(`/api/v1/images/${imageId}`);

			dispatch(clearLoadingAction());
			if (image?.id === imageId) {
				setImage(null);
				formik.setFieldValue('imageId', '');
				//clear file in unput
				//apperantly this is the best way for browser support
				inputImageEl.current.type = 'text';
				inputImageEl.current.type = 'file';
			}
			if (thumbnail?.id === imageId) {
				formik.setFieldValue('thumbnailId', '');
				setThumbnail(null);
				inputThumbnailEl.current.type = 'text';
				inputThumbnailEl.current.type = 'file';
			}
		} catch (err) {
			dispatch(clearLoadingAction());
			dispatch(uiErrorAction('Došlo je do greške pri brisanju slike.'));
		}
	};

	const defaultOnSubmit = (v) => {
		dispatch(
			createBlogAction(
				v.imageId,
				v.imageAlt,
				v.thumbnailId,
				v.thumbnailAlt,
				v.title,
				v.blog,
				v.synopsis
			)
		);
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required('Polje Obavezno!'),
		blog: Yup.string().required('Sadržaj bloga je obavezan..'),
		imageId: Yup.string().required('Glavna slika je obavezna.'),
		imageAlt: Yup.string().required('Alt naziv je obavezan.'),
		thumbnailId: Yup.string().required('Thumbnail slika je obavezna.'),
		thumbnailAlt: Yup.string().required('Alt naziv je obavezan.'),
	});

	const formik = useFormik({
		initialValues: {
			title: props.title || '',
			blog: props.blog || '',
			imageId: props.imageId || '',
			imageAlt: props.imageAlt || '',
			thumbnailId: props.thumbnailId || '',
			thumbnailAlt: props.thumbnailAlt || '',
			synopsis: props.synopsis || '',
		},
		onSubmit: props.onSubmit || defaultOnSubmit,
		validationSchema,
	});

	const handleBlogChange = (event, editor) => {
		const data = editor.getData();
		formik.setFieldValue('blog', data);
	};

	return (
		<div className={classes.container}>
			<form className={`${classes.item} ${classes.form}`}>
				<Typography variant="h4" component="h2" style={{ marginBottom: 15 }}>
					Blog Editor
				</Typography>
				<div className={classes.divider} />
				<input
					type="file"
					id="image"
					name="image"
					style={{ display: 'none' }}
					onChange={(e) => handleImageSelection(e, setImage)}
					disabled={!!image}
					ref={inputImageEl}
				/>
				<InputLabel htmlFor="image" className={classes.uploadButton}>
					Upload Glavne Slike
				</InputLabel>
				{image && (
					<>
						<img
							src={image.path}
							className={classes.formImage}
							alt={formik.values.imageAlt}
						/>
						<Typography
							variant="body2"
							color="secondary"
							deleteelid={image.id}
							onClick={handleImageDelete}
							className={classes.deleteImageButton}
						>
							x obriši sliku
						</Typography>
					</>
				)}
				<TextField
					name="imageAlt"
					label="Alternativni tekst za glavnu sliku."
					variant="standard"
					onChange={formik.handleChange}
					value={formik.values.imageAlt}
					className={classes.textField}
					error={!!formik.errors.imageAlt}
					helperText={formik.errors.imageAlt}
				/>
				<input
					type="file"
					id="thumbnail"
					name="thumbnail"
					style={{ display: 'none' }}
					onChange={(e) => handleImageSelection(e, setThumbnail)}
					disabled={!!thumbnail}
					ref={inputThumbnailEl}
				/>
				<InputLabel htmlFor="thumbnail" className={classes.uploadButton}>
					Upload Thumbnail-a 300x200
				</InputLabel>
				{thumbnail && (
					<>
						<img
							src={thumbnail.path}
							className={classes.formImage}
							alt={formik.values.thumbnailAlt}
						/>
						<Typography
							variant="body2"
							color="secondary"
							className={classes.deleteImageButton}
							deleteelid={thumbnail.id}
							onClick={handleImageDelete}
						>
							x obriši sliku
						</Typography>
					</>
				)}
				<TextField
					name="thumbnailAlt"
					label="Alternativni tekst za thumbnail."
					variant="standard"
					onChange={formik.handleChange}
					value={formik.values.thumbnailAlt}
					className={classes.textField}
					style={{ marginBottom: 35 }}
					error={!!formik.errors.thumbnailAlt}
					helperText={formik.errors.thumbnailAlt}
				/>
				<TextField
					name="title"
					label="Naslov"
					variant="outlined"
					onChange={formik.handleChange}
					value={formik.values.title}
					className={classes.textField}
					error={!!formik.errors.title}
					helperText={formik.errors.title}
				/>
				<TextField
					name="synopsis"
					label="Sinopsis (nije obavezno)"
					variant="outlined"
					onChange={formik.handleChange}
					value={formik.values.synopsis}
					className={classes.textField}
					multiline
					rows={2}
				/>
				<TextEditor value={formik.values.blog} onChange={handleBlogChange} />
				<Button
					variant="contained"
					color="primary"
					style={{ alignSelf: 'flex-start', marginTop: 20 }}
					size="large"
					onClick={formik.submitForm}
					disabled={!formik.dirty || !formik.isValid}
				>
					{props.buttonText || 'Napravi Blog'}
				</Button>
			</form>
			<div className={`${classes.item} ${classes.blog}`}>
				<Typography variant="h4" component="h2" style={{ marginBottom: 15 }}>
					Preview
				</Typography>
				<div className={classes.divider} />
				<div
					className="blog"
					style={{
						borderLeft: '1px solid #ccc',
						borderRight: '1px solid #ccc',
					}}
				>
					<header style={image ? { background: `url(${image.path})` } : {}}>
						<h1>{formik.values.title}</h1>
					</header>
					<div>{parse(formik.values.blog)}</div>
				</div>
			</div>

			{/*  UI  */}
			<LoadingModal />
			<SuccessSnackbar />
			<ErrorSnackbar />
		</div>
	);
};

BlogEditor.propTypes = {
	title: PropTypes.string,
	blog: PropTypes.string,
	imageId: PropTypes.string,
	imageAlt: PropTypes.string,
	thumbnailId: PropTypes.string,
	thumbnailAlt: PropTypes.string,
	synopsis: PropTypes.string,
	image: PropTypes.object,
	thumbnail: PropTypes.object,
	onSubmit: PropTypes.func,
	buttonText: PropTypes.string,
};

export default BlogEditor;
