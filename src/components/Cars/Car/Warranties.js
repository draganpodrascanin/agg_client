import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	makeStyles,
	Paper,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	withStyles,
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import CustomModal from '../../CustomModal';
import CreateWarrantyForm from '../../Forms/Warranty';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
	deleteWarrantyAction,
	editWarrantyAction,
} from '../../../redux/actions/warrantyActions';
import ConfirmModal from '../../ConfirmModal';

const useStyles = makeStyles((theme) => ({
	section: {
		paddingBottom: 30,
	},
	addWarrantyButton: {
		color: theme.palette.primary.main,
		background: '#fff',
		marginLeft: 10,
		marginTop: 2,
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: 15,
	},
}));

const StyledTableRow = withStyles((theme) => ({
	root: {
		width: '100%',
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
	root: {
		width: '100%',
		minWidth: 'content',
	},
	head: {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const Warranties = ({ warranties }) => {
	const classes = useStyles();
	const car = useSelector((state) => state.activeCar);
	const dispatch = useDispatch();

	//-----------------------------------------------------------------------------
	const [openCreateWarrantyModal, setCreateWarrantyModal] = useState(false);
	const handleCreateWarrantyModal = () => {
		setCreateWarrantyModal(!openCreateWarrantyModal);
	};

	//-----------------------------------------------------------------------------
	const [activeWarranty, setActiveWarranty] = useState(null);

	const handleActiveWarranty = (warranty) => {
		setActiveWarranty(warranty);
	};

	const editWarrantyOnSubmit = (v) => {
		dispatch(
			editWarrantyAction(activeWarranty.id, v.partsUnderWarranty, v.validUntil)
		);
	};
	//-----------------------------------------------------------------------------
	const [openDeleteModal, setDeleteModal] = useState(false);

	const handleDeleteModal = () => {
		setDeleteModal(!openDeleteModal);
	};

	const submitDeleteWarranty = (warrantyId) => {
		dispatch(deleteWarrantyAction(warrantyId));
		handleDeleteModal(false);
		handleActiveWarranty(null);
	};
	//-----------------------------------------------------------------------------

	const renderWarranties = (warranties) => {
		return (
			<TableContainer component={Paper}>
				<TableHead>
					<TableRow>
						<StyledTableCell>Deo / delovi pod garancijom:</StyledTableCell>
						<StyledTableCell align="right" style={{ minWidth: 120 }}>
							Uslovi:
						</StyledTableCell>
						<StyledTableCell align="right">Važi do:</StyledTableCell>
					</TableRow>
				</TableHead>
				{warranties.map((warranty) => (
					<StyledTableRow
						key={warranty.id}
						onClick={() => handleActiveWarranty(warranty)}
					>
						<StyledTableCell component="th" scope="row">
							{warranty.partsUnderWarranty}
						</StyledTableCell>
						<StyledTableCell align="right">
							{warranty.warrantyConditions.conditionsTitle}
						</StyledTableCell>
						<StyledTableCell align="right">
							{dayjs(warranty.validUntil).format('DD.MM.YYYY.')}
						</StyledTableCell>
					</StyledTableRow>
				))}
			</TableContainer>
		);
	};

	return (
		<section className={classes.section}>
			{/**----------------------------------------------------------------------------------- */}
			<CustomModal
				open={openCreateWarrantyModal}
				onClose={handleCreateWarrantyModal}
			>
				<CreateWarrantyForm carId={car.id} />
			</CustomModal>
			{/**----------------------------------------------------------------------------------- */}
			<CustomModal
				open={!!activeWarranty}
				onClose={() => handleActiveWarranty(null)}
			>
				{/** edit warranty form **/}
				<CreateWarrantyForm
					partsUnderWarranty={
						activeWarranty && activeWarranty.partsUnderWarranty
					}
					validUntil={
						activeWarranty &&
						dayjs(activeWarranty.validUntil).format('YYYY-MM-DD')
					}
					onSubmit={editWarrantyOnSubmit}
				/>
				<Button
					color="secondary"
					style={{ marginTop: 20 }}
					startIcon={<Delete />}
					onClick={handleDeleteModal}
				>
					Obriši garanciju
				</Button>
			</CustomModal>

			{/**----------------------------------------------------------------------------------- */}
			<ConfirmModal
				heading="Da li ste sigurni da želite da obrišete garanciju?"
				open={openDeleteModal}
				onClose={handleDeleteModal}
				onSubmit={() => submitDeleteWarranty(activeWarranty.id)}
			/>
			{/**----------------------------------------------------------------------------------- */}

			<div className={classes.header}>
				<Typography variant="h3" component="h3" style={{ marginLeft: -2 }}>
					Garancije
				</Typography>
				<Button
					variant="outlined"
					className={classes.addWarrantyButton}
					startIcon={<Add />}
					color="inherit"
					size="small"
					onClick={handleCreateWarrantyModal}
				>
					Dodaj Garanaciju
				</Button>
			</div>
			{(!warranties || !warranties[0]) && (
				<Typography variant="body2">Nema registrovanih garancija..</Typography>
			)}
			{warranties && warranties[0] && renderWarranties(warranties)}
		</section>
	);
};

Warranties.propTypes = {
	warranties: PropTypes.array,
};

export default Warranties;
