import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Add } from '@material-ui/icons';
import CreateWorkOrderModal from './CreateWorkOrderModal';
import { WorkOrderCards } from './WorkOrderCards';
import { LoadingModal } from '../UI/LoadingModal';
import { SuccessSnackbar } from '../UI/SuccessSnackbar';
import { ErrorSnackbar } from '../UI/ErrorSnackbar';

const ServisniNalozi = () => {
	const [openCreateNewModal, setOpenCreateNewModal] = useState(false);

	const handleOpenCreateNewModal = () => {
		setOpenCreateNewModal(!openCreateNewModal);
	};

	return (
		<div>
			<CreateWorkOrderModal
				onClose={handleOpenCreateNewModal}
				open={openCreateNewModal}
			/>
			<Button
				variant="outlined"
				startIcon={<Add />}
				color="default"
				style={{ background: '#fff' }}
				onClick={handleOpenCreateNewModal}
			>
				Dodaj Novi Servisni Nalog
			</Button>
			<WorkOrderCards />

			{/*-------------------------UI---------------------------- */}
			<LoadingModal />
			<SuccessSnackbar />
			<ErrorSnackbar />
		</div>
	);
};

export default ServisniNalozi;
