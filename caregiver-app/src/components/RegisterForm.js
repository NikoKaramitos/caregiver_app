import React, { useState } from "react";
import InputField from "./InputField";
import Card from "./Card";
import Button from "./Button";

function RegisterForm({ formData, setFormData, goToNextStep }) {
	const [error, setError] = useState(""); // To store password mismatch error

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleContinue = () => {
		if (formData.password !== formData.confirmPass) {
			setError("Passwords do not match.");
			return;
		}

		setError(""); // Clear error if passwords match
		goToNextStep();
	};

	return (
		<div className="flex align-baseline">
				<form className="w-full">
					<InputField
						type="text"
						name="name"
						placeholder="Name"
						value={formData.name}
						onChange={handleChange}
					/>
					<InputField
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
					/>
					<InputField
						type="text"
						name="address"
						placeholder="Address"
						value={formData.address}
						onChange={handleChange}
					/>
					<InputField
						type="text"
						name="phone"
						placeholder="Phone"
						value={formData.phone}
						onChange={handleChange}
					/>
					<InputField
						type="text"
						name="username"
						placeholder="Username"
						value={formData.username}
						onChange={handleChange}
					/>
					<InputField
						type="password"
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
					/>
					<InputField
						type="password"
						name="confirmPass"
						placeholder="Confirm Password"
						value={formData.confirmPass}
						onChange={handleChange}
					/>
					{error && (
						<p className="text-red-500 text-sm mt-2">{error}</p>
					)}
					<div className="flex justify-end">
						<Button
							text="Continue"
							type="button"
							onClick={handleContinue}
						/>
					</div>
				</form>
		</div>
	);
}

export default RegisterForm;
