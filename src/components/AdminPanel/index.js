import { Button, makeStyles, Typography } from '@material-ui/core';
import { Add, Delete, ErrorOutline } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	createAdminAction,
	deleteAdminAction,
	getAdminsAction,
	updateAdminAction,
	updateAdminPasswordAction,
} from '../../redux/actions/adminActions';
import AdminForm from '../Forms/AdminForm';
import AdminPasswordForm from '../Forms/AdminPassword';
import { roleTranslate } from '../util/roleTranslate';
import CustomModal from '../CustomModal';
import { SuccessSnackbar } from '../UI/SuccessSnackbar';
import { ErrorSnackbar } from '../UI/ErrorSnackbar';
import { LoadingModal } from '../UI/LoadingModal';
import ConfirmModal from '../ConfirmModal';

const useStyles = makeStyles((theme) => ({
	container: {
		background: '#fff',
		width: '100%',
		display: 'flex',
		marginTop: 20,
	},
	aside: {
		display: 'flex',
		flexDirection: 'column',
		width: 200,
		borderRight: '1px solid rgba(0,0,0,0.1)',
	},
	asideItem: {
		borderBottom: '1px solid rgba(0,0,0,0.05)',
		padding: '20px',
		transition: 'all .3s',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'column',

		'&:hover': {
			background: theme.palette.primary.dark,
			color: '#fff',

			'& span': {
				color: '#f8f8f8',
			},
		},

		'& span': {
			color: theme.palette.text.secondary,
		},
	},
	asideItemActive: {
		background: theme.palette.primary.dark,
		color: '#fff',

		'& span': {
			color: '#f8f8f8',
		},
	},
	formContainer: {
		padding: 50,
	},
	createNewButton: {
		border: `1px solid ${theme.palette.text.primary}`,
		marginBottom: 15,
	},
	formsContent: {
		height: 'fit-content',
		display: 'flex',
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	deleteBtn: {
		margin: '0 0 50px 50px',
		display: 'flex',
	},
}));

const AdminPanel = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const admins = useSelector((state) => state.admins);
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal);
	};

	const handleShowModal = () => setShowModal(!showModal);

	const [activeAdmin, setActiveAdmin] = useState({});
	const handleActiveAdmin = (admin) => {
		setActiveAdmin(admin);
	};

	useEffect(() => {
		dispatch(getAdminsAction());
	}, [dispatch]);

	const [showForm, setShowForm] = useState(false);

	const createAdminOnSubmit = (v) => {
		dispatch(
			createAdminAction(
				v.username,
				v.firstName,
				v.lastName,
				v.email,
				v.phoneNumber,
				v.password,
				v.passwordConfirm,
				v.role
			)
		);
	};

	const updateAdminOnSubmit = (v) => {
		dispatch(
			updateAdminAction({
				id: activeAdmin.id,
				email: v.email,
				firstName: v.firstName,
				lastName: v.lastName,
				phoneNumber: v.phoneNumber,
				role: v.role,
				username: v.username,
			})
		);
	};

	const updatePasswordOnSubmit = (v) => {
		dispatch(
			updateAdminPasswordAction(activeAdmin.id, v.password, v.passwordConfirm)
		);
	};

	const deleteAdminOnSubmit = (id) => {
		dispatch(deleteAdminAction(id));
	};

	return (
		<>
			<ConfirmModal
				open={showDeleteModal}
				onClose={handleDeleteModal}
				heading="Da li ste sigurni da želite da izbrišete Administratora?"
				btn1="Izbriši"
				btn2="Otkaži"
				headIcon={<ErrorOutline />}
				onSubmit={() => {
					deleteAdminOnSubmit(activeAdmin.id);
				}}
			/>
			<Button
				variant="outlined"
				startIcon={<Add />}
				className={classes.createNewButton}
				onClick={handleShowModal}
			>
				Dodaj Korisnika
			</Button>
			<CustomModal open={showModal} onClose={handleShowModal}>
				<AdminForm
					heading="Napravi Novog Administratora"
					create
					onSubmit={createAdminOnSubmit}
				/>
			</CustomModal>
			<div className={classes.container}>
				<aside className={classes.aside}>
					{admins.map((admin) => (
						<div
							className={
								activeAdmin?.id === admin.id
									? `${classes.asideItem} ${classes.asideItemActive}`
									: classes.asideItem
							}
							key={admin.id}
							onClick={() => {
								handleActiveAdmin(admin);
								setShowForm(false);
								requestAnimationFrame(() => {
									setShowForm(true);
								});
							}}
						>
							<Typography variant="body1" component="p">
								{admin.firstName} {admin.lastName}
							</Typography>

							<Typography variant="caption" component="p">
								{roleTranslate(admin.role)}
							</Typography>
							<Typography variant="caption" component="span">
								username: {admin.username}
							</Typography>

							<Typography variant="caption" component="span">
								{admin.email}
							</Typography>
							<Typography variant="caption" component="span">
								{admin.phoneNumber}
							</Typography>
						</div>
					))}
				</aside>
				<div className={classes.content}>
					<div className={classes.formsContent}>
						<div className={classes.formContainer}>
							{showForm && (
								<AdminForm
									firstName={activeAdmin.firstName}
									lastName={activeAdmin.lastName}
									username={activeAdmin.username}
									phoneNumber={activeAdmin.phoneNumber}
									role={activeAdmin.role}
									email={activeAdmin.email}
									heading="Napravi Izmene"
									onSubmit={updateAdminOnSubmit}
								/>
							)}
						</div>
						<div className={classes.formContainer}>
							{showForm && (
								<AdminPasswordForm onSubmit={updatePasswordOnSubmit} />
							)}
						</div>
					</div>
					{showForm && (
						<Button
							className={classes.deleteBtn}
							color="secondary"
							startIcon={<Delete />}
							onClick={handleDeleteModal}
						>
							Obriši Administratora
						</Button>
					)}
				</div>
			</div>
			{/*  UI  */}
			<LoadingModal />
			<SuccessSnackbar />
			<ErrorSnackbar />
		</>
	);
};

export default AdminPanel;
