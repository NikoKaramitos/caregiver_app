import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import Card from "./Card";

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
		console.log("Login Submitted:", formData);
		// send data to backend
	};

	return (
		<div className="flex align-baseline">
			<Card className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl h-auto mx-auto">
				<h2 className="text-5xl font-bold mb-5 text-left">Sign In</h2>
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
				<a href="/register" className="text-2xl text-blue-500 block mt-5 text-center">
					Dont have an account?
				</a>
			</Card>
		</div>
	);
}

export default LoginForm;
