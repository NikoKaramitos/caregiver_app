import React from "react";
import InputField from "./InputField";
import Card from "./Card";
import Button from "./Button";

function ParentForm({ formData, setFormData, handleFinalSubmit }) {
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex align-baseline">
				<form className="w-full">
					<InputField
						type="text"
						name="name"
						placeholder="Parent's Name"
						value={formData.name}
						onChange={handleChange}
					/>
					<InputField
						type="text"
						name="address"
						placeholder="Parent's Address"
						value={formData.address}
						onChange={handleChange}
					/>
					<InputField
						type="text"
						name="phone"
						placeholder="Parent's Phone"
						value={formData.phone}
						onChange={handleChange}
					/>
					<div className="flex justify-end">
						<Button
							text="Submit"
							type="button"
							onClick={handleFinalSubmit}
						/>
					</div>
				</form>
		</div>
	);
}

export default ParentForm;
