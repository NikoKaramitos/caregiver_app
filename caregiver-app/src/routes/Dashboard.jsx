import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

function DashboardRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
		</Routes>
	);
}

export default DashboardRoutes;
