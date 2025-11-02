import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function RequireAdmin({ children }) {
	const { user, isAdmin, loading } = React.useContext(UserContext);

	if (loading) return null; // le temps que le contexte charge

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (!isAdmin()) {
		return <Navigate to="/unauthorized" replace />;
	}

	return children;
}
