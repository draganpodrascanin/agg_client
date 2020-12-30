import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Add } from '@material-ui/icons';
import CreateWorkOrderModal from './CreateWorkOrderModal';
import { WorkOrderCards } from './WorkOrderCards';

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
				onClick={handleOpenCreateNewModal}
			>
				Dodaj Novi Servisni Nalog
			</Button>
			<WorkOrderCards />
		</div>
	);
};

export default ServisniNalozi;
