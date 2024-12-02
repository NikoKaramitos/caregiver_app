import React, { useState, useEffect } from "react";
import EditMemberForm from "../components/EditMemberForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditMember() {
	const { memberId } = useParams();
	const [initialValues, setInitialValues] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
    const navigate = useNavigate();

	useEffect(() => {
		fetch(`http://localhost:8000/getmemberinfo.php?memberID=${memberId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(async (response) => {
				if (!response.ok) {
					const errorText = await response.text();
					throw new Error(
						`HTTP error! Status: ${response.status} - ${errorText}`
					);
				}
				return response.json();
			})
			.then((data) => {
				if (data.message === "Member found") {
					setInitialValues({
						name: data.name,
						phone: data.phone,
						email: data.email,
						address: data.address,
						timeAvailable: data.timeAvailable,
					});
				} else {
					setError("Member not found");
				}
			})
			.catch((error) => {
				console.error("Error fetching member data:", error);
				setError("Error fetching member data");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [memberId]);

	const handleFormSubmit = async (formData) => {
		try {
			const response = await fetch(
				"http://localhost:8000/editmember.php",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ ...formData, memberID: memberId }),
				}
			);

			const data = await response.json();

			if (data.message === "Member updated successfully") {
				alert("Information updated successfully!");
                navigate('/home');
			} else {
				alert(data.message || "Failed to update member information.");
			}
		} catch (err) {
			console.error("Error updating member data:", err);
			alert("An error occurred while updating member information.");
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Edit Member Information</h1>
			{isLoading ? (
				<p>Loading member data...</p>
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<EditMemberForm
					initialValues={initialValues}
					onSubmit={handleFormSubmit}
				/>
			)}
		</div>
	);
}

export default EditMember;
