import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";

function RegisterRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Register />} />
		</Routes>
	);
}

export default RegisterRoutes;
