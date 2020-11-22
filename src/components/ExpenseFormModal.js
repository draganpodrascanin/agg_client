import { Modal } from '@material-ui/core';
import React from 'react';

export const ExpenseFormModal = (props) => {
	return (
		<Modal
			open={props.modalOpen}
			onClose={props.handleModalOpen}
			aria-labelledby="Expense-Form"
			aria-describedby="Modal-For-Form-that-creates-new-expenses"
		>
			{props.children}
		</Modal>
	);
};
