import React, { useEffect } from 'react';
import { ErrorSnackbar } from '../UI/ErrorSnackbar';
import { LoadingModal } from '../UI/LoadingModal';
import { SuccessSnackbar } from '../UI/SuccessSnackbar';
import JobTicketCards from './JobTicketCards';
import { useDispatch, useSelector } from 'react-redux';
import { getJobTicketsAction } from '../../redux/actions/jobTicketsActions';

const JobTickets = () => {
	const dispatch = useDispatch();
	const jobTickets = useSelector((state) => state.jobTickets);

	useEffect(() => {
		dispatch(getJobTicketsAction());
	}, [dispatch]);

	return (
		<>
			<JobTicketCards jobTickets={jobTickets} />
			{/*-----------------UI-------------------------- */}
			<LoadingModal />
			<SuccessSnackbar />
			<ErrorSnackbar />
		</>
	);
};

export default JobTickets;
