import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
// import { getCurrentAdminAction } from '../redux/actions/authAction';

export const LoginRoute = (props) => {
	const admin = useSelector((state) => state.admin);
	const history = useHistory();
	useEffect(() => {
		if (admin.isLoggedIn) {
			if (admin.role !== 'blogger') {
				history.push('/servisni-nalozi');
			} else history.push('/blog');
		}
	}, [history, admin]);

	return (
		<div>
			<Route {...props}>{props.children}</Route>
		</div>
	);
};
