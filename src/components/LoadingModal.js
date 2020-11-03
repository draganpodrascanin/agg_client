import { CircularProgress, Modal } from '@material-ui/core';
import React from 'react';

export const LoadingModal = (props) => {
	return (
		<Modal
			open={props.open}
			onClose={props.handleClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			>
				<CircularProgress
					style={{
						color: '#fff',
						height: 100,
						width: 100,
					}}
				/>
			</div>
		</Modal>
	);
};
