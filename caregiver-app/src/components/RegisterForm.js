import React, { useState } from "react";
import InputField from "./InputField";
import Card from "./Card";
import Button from "./Button";

function RegisterForm({ goToNextStep }) {
	const [formData, setFormData] = useState({
		name: "",
		password: "",
		confirmPass: "",
		phone: "",
		email: "",
		address: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex flex-col align-baseline">
				<form className="w-full">
					<InputField
						type="text"
						name="username"
						placeholder="username"
						value={formData.name}
						onChange={handleChange}
					/>
					<InputField
						type="email"
						name="email"
						placeholder="email"
						value={formData.email}
						onChange={handleChange}
					/>
					<InputField
						type="text"
						name="address"
						placeholder="address"
						value={formData.address}
						onChange={handleChange}
					/>
					<InputField
						type="text"
						name="phone"
						placeholder="phone"
						value={formData.phone}
						onChange={handleChange}
					/>
					<InputField
						type="password"
						name="password"
						placeholder="password"
						value={formData.password}
						onChange={handleChange}
					/>
					<InputField
						type="password"
						name="confirmPass"
						placeholder="confirm password"
						value={formData.confirmPass}
						onChange={handleChange}
					/>
					<Button
						text="Continue"
						type="button"
						onClick={goToNextStep}
					/>
				</form>
		</div>
	);
}

export default RegisterForm;
