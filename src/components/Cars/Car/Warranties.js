import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import CustomModal from '../../CustomModal';
import CreateWarrantyForm from '../../Forms/Warranty';

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

const Warranties = ({ warranties }) => {
	const classes = useStyles();

	const [openCreateWarrantyModal, setCreateWarrantyModal] = useState(false);
	const handleCreateWarrantyModal = () => {
		setCreateWarrantyModal(!openCreateWarrantyModal);
	};

	return (
		<section className={classes.section}>
			<CustomModal
				open={openCreateWarrantyModal}
				onClose={handleCreateWarrantyModal}
			>
				<CreateWarrantyForm />
			</CustomModal>

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
			{warranties && warranties[0] && <p>postoje</p>}
		</section>
	);
};

Warranties.propTypes = {
	warranties: PropTypes.array,
};

export default Warranties;
