import React from "react";
import { Routes, Route } from "react-router-dom";
import EditMember from "../pages/EditMember";

function DashboardRoutes() {
	return (
		<Routes>
			<Route path="/" element={<EditMember />} />
		</Routes>
	);
}

export default DashboardRoutes;
