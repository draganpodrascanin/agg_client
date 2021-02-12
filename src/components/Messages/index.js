import React from 'react';
import { ErrorSnackbar } from '../UI/ErrorSnackbar';
import { LoadingModal } from '../UI/LoadingModal';
import { SuccessSnackbar } from '../UI/SuccessSnackbar';
import MessagePage from './MessagePage';

const Messages = () => {
	return (
		<div>
			<MessagePage />
			{/*  UI  */}
			<LoadingModal />
			<SuccessSnackbar />
			<ErrorSnackbar />
		</div>
	);
};

export default Messages;
