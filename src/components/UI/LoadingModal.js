import { CircularProgress, Modal } from '@material-ui/core';
import React from 'react';

export const LoadingModal = (props) => {
	return (
		<Modal
			open={props.open}
			onClose={props.handleClose}
			aria-labelledby="loading modal"
			aria-describedby="loading-modal-please-wait"
			style={{ zIndex: Infinity }}
		>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					border: 'none',
					outline: 'none',
					zIndex: 1000,
					'&:fokus': {
						outline: 'none',
					},
				}}
			>
				<CircularProgress
					style={{
						color: '#fff',
						height: 100,
						width: 100,
						border: 'none',
					}}
				/>
			</div>
		</Modal>
	);
};
