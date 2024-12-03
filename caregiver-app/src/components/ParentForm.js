import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

function ParentForm({
	formData,
	setFormData,
	handleFinalSubmit,
	goToPreviousStep,
}) {
	const [suggestions, setSuggestions] = useState([]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleBlur = () => {
		setTimeout(() => {
			setSuggestions([]);
		}, 100);
	};

	// Fetch address suggestions from HERE API using fetch
	const handleAddressChange = async (e) => {
		const query = e.target.value;
		setFormData({ ...formData, address: query });

		if (query.length < 3) {
			setSuggestions([]); // Clear suggestions for short queries
			return;
		}

		try {
			const response = await fetch(
				`https://api.radar.io/v1/search/autocomplete?query=${encodeURIComponent(
					query
				)}`,
				{
					method: "GET",
					headers: {
						Authorization: process.env.REACT_APP_HERE_API_KEY,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to fetch address suggestions");
			}

			const data = await response.json();
			setSuggestions(data.addresses || []);
		} catch (error) {
			console.error("Error fetching address suggestions:", error);
		}
	};

	const handleAddressSelect = (address) => {
		setFormData({ ...formData, address });
		setSuggestions([]); // Clear suggestions after selection
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
				{/* Address Input with Suggestions */}
				<div className="relative mb-4">
					<input
						type="text"
						name="address"
						placeholder="Enter your address"
						value={formData.address}
						onBlur={handleBlur}
						onChange={handleAddressChange}
						className="w-full text-2xl px-4 py-4 border mt-4 border-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
					/>
					{suggestions.length > 0 && (
						<ul className="absolute z-10 bg-white border rounded-md shadow-md mt-2 max-h-40 overflow-y-auto w-full">
							{suggestions.map((suggestion, index) => (
								<li
									key={index}
									className="px-4 py-2 cursor-pointer hover:bg-gray-200"
									onClick={() =>
										handleAddressSelect(
											suggestion.formattedAddress
										)
									}
								>
									{suggestion.formattedAddress}
								</li>
							))}
						</ul>
					)}
				</div>
				<InputField
					type="text"
					name="phone"
					placeholder="Parent's Phone"
					value={formData.phone}
					onChange={handleChange}
				/>
				<div className="flex justify-between mt-4">
					<div className="mr-4">
						<Button
							text="Back"
							type="button"
							onClick={goToPreviousStep}
						/>
					</div>
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
