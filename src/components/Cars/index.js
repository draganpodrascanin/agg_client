import { Button, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useState } from 'react';
import { ErrorSnackbar } from '../UI/ErrorSnackbar';
import { LoadingModal } from '../UI/LoadingModal';
import { SuccessSnackbar } from '../UI/SuccessSnackbar';
import { CarCards } from './CarCards';
import RegisterCarModal from './RegisterCarModal';

const useStyles = makeStyles((theme) => ({
	carCards: {},
}));

const CarsComponent = () => {
	const classes = useStyles();
	const [newCarModalOpen, setNewCarModalOpen] = useState(false);

	const handleNewCarModalOpen = () => {
		setNewCarModalOpen(!newCarModalOpen);
	};

	return (
		<div>
			<RegisterCarModal open={newCarModalOpen} close={handleNewCarModalOpen} />
			<Button
				onClick={handleNewCarModalOpen}
				variant="outlined"
				color="default"
				startIcon={<Add />}
			>
				Registruj automobil
			</Button>
			<CarCards className={classes.carCards} />

			{/*  UI  */}
			<LoadingModal />
			<SuccessSnackbar />
			<ErrorSnackbar />
		</div>
	);
};

export default CarsComponent;
