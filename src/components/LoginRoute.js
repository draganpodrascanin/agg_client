import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory, useLocation } from 'react-router-dom';

export const LoginRoute = (props) => {
	const admin = useSelector((state) => state.admin);
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		//if was redirected to login page return to previous page after login
		//if not go to default page by the role you logged in as
		if (admin.isLoggedIn && location?.state?.from?.pathname)
			history.push(location.state.from.pathname);
		else if (admin.role === 'admin' || admin.role === 'super-admin')
			history.push('/');
		else if (admin.role === 'mechanic') history.push('/servisni-nalozi');
		else if (admin.role === 'blogger') history.push('/blog');
	}, [location, history, admin]);

	return (
		<div>
			<Route {...props}>{props.children}</Route>
		</div>
	);
};
