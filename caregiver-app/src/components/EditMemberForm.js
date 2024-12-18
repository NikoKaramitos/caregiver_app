// EditMemberForm.js

import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import Button from "./Button";

function EditMemberForm({ initialValues, onSubmit }) {
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		email: "",
		address: "",
		timeAvailable: "",
		profilePictureURL: "",
		rate: "",
	});

	const [suggestions, setSuggestions] = useState([]); // Store autocomplete suggestions

	// Update formData when initialValues change
	useEffect(() => {
		if (initialValues) {
			setFormData({
				name: initialValues.name || "",
				phone: initialValues.phone || "",
				email: initialValues.email || "",
				address: initialValues.address || "",
				timeAvailable: initialValues.timeAvailable || "",
				profilePictureURL: initialValues.profilePictureURL || "",
				rate: initialValues.rate || "",
			});
		}
	}, [initialValues]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleBlur = () => {
		setTimeout(() => {
			setSuggestions([]);
		}, 100);
	};

	const handleAddressChange = async (e) => {
		const query = e.target.value;
		setFormData({ ...formData, address: query });

		if (query.length < 3) {
			setSuggestions([]);
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
						Authorization: `${process.env.REACT_APP_HERE_API_KEY}`,
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
		setSuggestions([]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<div className="flex align-baseline">
			<form className="w-full" onSubmit={handleSubmit}>
				<span>Name</span>
				<InputField
					type="text"
					name="name"
					placeholder="Name"
					value={formData.name}
					onChange={handleChange}
				/>
				<span>Email</span>
				<InputField
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
				/>
				<span>Address</span>
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
				<span>Phone Number</span>
				<InputField
					type="text"
					name="phone"
					placeholder="Phone"
					value={formData.phone}
					onChange={handleChange}
				/>
				<div className="flex flex-row justify-between">
					<div className="w-1/2 mr-2">
						<label htmlFor="timeAvailable" className="block mb-1">
							Hours Available
						</label>
						<InputField
							type="number"
							name="timeAvailable"
							placeholder="Hours Available"
							value={formData.timeAvailable}
							onChange={handleChange}
						/>
					</div>
					<div className="w-1/2 ml-2">
						<label htmlFor="rate" className="block mb-1">
							Rate
						</label>
						<InputField
							type="number"
							name="rate"
							placeholder="Rate"
							value={formData.rate}
							onChange={handleChange}
						/>
					</div>
				</div>
				<span>Profile Picture</span>
				<InputField
					type="text"
					name="profilePictureURL" // Ensure this matches the backend
					placeholder="Profile Picture URL"
					value={formData.profilePictureURL}
					onChange={handleChange}
				/>
				<div className="flex justify-end">
					<Button text="Save Changes" type="submit" />
				</div>
			</form>
		</div>
	);
}

export default EditMemberForm;
