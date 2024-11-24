import React, { useState } from "react";
import InputField from "./InputField";
import Card from "./Card";
import Button from "./Button";

function ParentForm({ goToNextStep, goToPreviousStep }) {
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		address: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Send data to the backend
		console.log("Parent Registered:", formData);
		goToNextStep(); // Go to the next step after submitting
	};

	return (
		<div className="flex flex-col align-baseline">
			<form onSubmit={handleSubmit} className="w-full">
				<InputField
					type="text"
					name="name"
					placeholder="Parent's name"
					value={formData.name}
					onChange={handleChange}
				/>
				<InputField
					type="text"
					name="address"
					placeholder="Parent's address"
					value={formData.address}
					onChange={handleChange}
				/>
				<InputField
					type="text"
					name="phone"
					placeholder="Parent's phone"
					value={formData.phone}
					onChange={handleChange}
				/>
				<div className="flex flex-row items-center justify-between ">
					<button
                        text="Back"
						type="button"
						onClick={goToPreviousStep}
                        className="w-full bg-gray-300 text-black text-3xl font-bold py-4 px-4 mr-4 rounded-lg hover:bg-green-600 focus:outline-none"
					>
                        Back
                    </button>
					<Button text="Submit" type="submit" />
				</div>
			</form>
		</div>
	);
}

export default ParentForm;
