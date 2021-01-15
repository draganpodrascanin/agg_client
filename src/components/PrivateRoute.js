import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = (props) => {
	const { roles } = props;
	const history = useHistory();
	let admin = useSelector((state) => state.admin);

	useEffect(() => {
		if (!admin.isLoggedIn)
			return history.push('/login', { from: history.location });

		if (!roles.includes(admin.role)) {
			history.push('zabranjen-pristup');
		}
	}, [admin, admin.isLoggedIn, admin.role, history, roles]);

	return <Route {...props}>{props.children}</Route>;
};
