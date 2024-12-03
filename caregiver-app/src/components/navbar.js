import React from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
	const location = useLocation(); // Get the current route
	const doLogout = (event) => {
		event.preventDefault();
		localStorage.removeItem("userData");
		window.location.href = "/";
	};

	const renderButtons = () => {
		if (
			location.pathname === "/home" ||
			location.pathname === "/dashboard" ||
			location.pathname === "/editmember"
		) {
			// Show Home and Dashboard if the user is logged in
			return (
				<>
					<a
						href="/home"
						className="mt-2 text-2xl text-gray-600 hover:text-green-500 font-medium"
					>
						Home
					</a>
					<a
						href="/dashboard"
						className="mt-2 text-2xl text-gray-600 hover:text-green-500 font-medium"
					>
						Dashboard
					</a>
					<span
						onClick={doLogout}
						className="text-2xl text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 justify-evenly"
					>
						Logout
					</span>
				</>
			);
		}

		// Show Login and Sign Up if the user is not logged in
		if (location.pathname === "/" || location.pathname === "/register") {
			return (
				<>
					<a
						href="/"
						className="mt-2 text-2xl text-gray-600 hover:text-green-500 font-medium"
					>
						Login
					</a>
					<a
						href="/register"
						className="text-2xl text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 justify-evenly"
					>
						Sign Up
					</a>
				</>
			);
		}

		// Default buttons
		return null;
	};

	return (
		<nav className="bg-white border border-gray-300">
			<div className="max-w-8xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
				<div className="flex justify-between h-20 items-center">
					<div className="flex-shrink-0 flex">
						<a href="/" className="text-7xl font-bold">
							<span className="text-green-500">We</span>Care
						</a>
					</div>
					<div className="hidden md:flex space-x-8">
						{renderButtons()}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
