import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = (props) => {
	const admin = useSelector((state) => state.admin);
	const { roles } = props;
	const history = useHistory();

	useEffect(() => {
		if (!admin.isLoggedIn) return history.push('/login');

		if (!roles.includes(admin.role)) {
			history.push('zabranjen-pristup');
		}
	}, [history.location.pathname, admin.isLoggedIn, admin.role, history, roles]);

	return <Route {...props}>{props.children}</Route>;
};
