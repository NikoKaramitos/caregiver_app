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

	const handleSubmit = async (e) => {
		e.preventDefault();
		// alert(`Login Submitted ${formData.username} ${formData.password}`);
		console.log("Login Submitted:", formData);
		// send data to backend
		let obj = { username: formData.username, password: formData.password };
		let js = JSON.stringify(obj);
		try {
			const response = await fetch("http://localhost:8000/login.php", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: js,
			});

			let res = JSON.parse(await response.text());
			console.log("Parsed Response:", res);
		} catch (error) {
			console.log(`ERROR: ${error}`);
		}
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
				<a
					href="/register"
					className="text-2xl text-blue-500 block mt-5 text-center"
				>
					Don't have an account?
				</a>
			</Card>
		</div>
	);
}

export default LoginForm;
