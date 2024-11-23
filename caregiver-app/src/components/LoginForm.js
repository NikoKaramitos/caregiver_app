import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

function LoginForm() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		alert(`Login Submitted ${formData.username} ${formData.password}`);
		console.log('Login Submitted:', formData);
		// send data to backend
	};

	return (
		<div className="flex flex-col justify-center items-center bg-white p-8 w-1/2 shadow-md rounded-lg">
			<h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
			<form onSubmit={handleSubmit} className="w-full">
				<InputField
					type="text"
					name="username"
					placeholder="username"
					value={formData.username}
					onChange={handleChange}
				/>
				<InputField
					type="password"
					name="password"
					placeholder="password"
					value={formData.password}
					onChange={handleChange}
				/>
				<Button text="Login" type="submit" />
			</form>
			<a href="/register" className="text-blue-500 mt-4">
				Dont have an account?
			</a>
		</div>
	);
}

export default LoginForm;
