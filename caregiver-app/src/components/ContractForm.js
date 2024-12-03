import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import Button from "./Button";

function ContractForm() {
	const [formData, setFormData] = useState({
		startDate: "",
		endDate: "",
		username: "",
		parentName: "",
		weeklyHours: "",
	});

	const navigate = useNavigate();

	const userData = JSON.parse(localStorage.getItem("userData"));
	const caregiverID = userData ? userData.id : null;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Function to convert date string to days since epoch
	const getDaysSinceEpoch = (dateString) => {
		const [year, month, day] = dateString.split("-").map(Number);
		const date = new Date(year, month - 1, day);
		return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Contract Data Submitted:", formData);

		if (!caregiverID) {
			alert("You must be logged in to create a contract.");
			return;
		}

		// Validate required fields
		if (
			!formData.startDate ||
			!formData.endDate ||
			!formData.username ||
			!formData.parentName ||
			!formData.weeklyHours
		) {
			alert("Please fill out all fields.");
			return;
		}

		// Convert dates to days since epoch
		const startDays = getDaysSinceEpoch(formData.startDate);
		const endDays = getDaysSinceEpoch(formData.endDate);

		let obj = {
			caregiverID: caregiverID,
			username: formData.username,
			parentName: formData.parentName,
			startDate: startDays,
			endDate: endDays,
			weeklyHours: formData.weeklyHours,
		};

		try {
			const response = await fetch(
				"http://localhost:8000/createContract.php",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(obj),
				}
			);

			let res = await response.json();

			if (response.ok) {
				console.log("Contract created successfully:", res);
				alert("Contract sent successfully!");
				navigate("/dashboard");
			} else {
				console.log("Error creating contract:", res.message);
				alert(res.message || "Error creating contract.");
			}
		} catch (error) {
			console.log(`ERROR: ${error}`);
			alert("An error occurred while sending the contract.");
		}
	};

	return (
		<div className="flex align-baseline">
			<form className="w-full">
				<h2 className="text-5xl font-bold mb-5 text-left">Contract</h2>
				<div className="flex flex-row justify-between">
					<div className="w-full mr-4">
						<span>Start Date</span>
						<InputField
							type="date"
							name="startDate"
							placeholder="Start Date"
							value={formData.startDate}
							onChange={handleChange}
						/>
					</div>
					<div className="w-full ml-4">
						<span>End Date</span>
						<InputField
							type="date"
							name="endDate"
							placeholder="End Date"
							value={formData.endDate}
							onChange={handleChange}
						/>
					</div>
				</div>

				<span>Recipient Information</span>
				<InputField
					type="text"
					name="username"
					placeholder="Recipient Username"
					value={formData.username}
					onChange={handleChange}
				/>
				<InputField
					type="text"
					name="parentName"
					placeholder="Parent Name"
					value={formData.parentName}
					onChange={handleChange}
				/>
				<span>Weekly Time Required</span>
				<InputField
					type="number"
					name="weeklyHours"
					placeholder="Hours"
					value={formData.weeklyHours}
					onChange={handleChange}
				/>
				<Button
					text="Send Contract"
					type="button"
					onClick={handleSubmit}
				/>
			</form>
		</div>
	);
}

export default ContractForm;
