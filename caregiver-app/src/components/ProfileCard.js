// ProfileCard.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
	const [extraData, setExtraData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showPopup, setShowPopup] = useState(false);
	const [careDollarAmount, setCareDollarAmount] = useState("");
	const userData = JSON.parse(localStorage.getItem("userData"));
	const navigate = useNavigate();

	const handleCreateContractClick = () => {
		navigate("/contract"); // Navigate to the contract creation page
	};

	const handleEditClick = () => {
		navigate(`/editmember`);
	};

	const handleAddCareDollarsClick = () => {
		setShowPopup(true); // Show the popup
	};

	const handleAmountChange = (e) => {
		setCareDollarAmount(e.target.value); // Update the amount
	};

	const handlePayClick = () => {
		fetch("http://localhost/updateCareDollars.php", {
			// Removed the trailing "?"
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				amount: careDollarAmount,
				memberID: userData.id, // Ensure memberID is sent
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.message) {
					window.location.reload(); // Refresh the page to update data
					alert(data.message); // Success message from PHP
				} else {
					alert("Failed to update Care Dollars."); // Fallback message
				}
			})
			.catch((error) => {
				console.error("Error updating Care Dollars:", error);
				alert("An error occurred while updating Care Dollars.");
				setShowPopup(false); // Close the popup after failure
			});
	};

	useEffect(() => {
		const fetchExtraData = async () => {
			try {
				const response = await fetch(
					`http://localhost:8000/getmemberinfo.php?memberID=${userData.id}`, // Use userData.id
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const data = await response.json();

				if (response.ok && data.message === "Member found") {
					setExtraData({
						name: data.name,
						phone: data.phone,
						email: data.email,
						address: data.address,
						timeAvailable: data.timeAvailable,
						profilePictureURL: data.profilePictureURL,
						rate: data.rate,
						careDollars: data.careDollars, // Ensure careDollars is included
						lastTenRatings: data.lastTenRatings, // Ensure lastTenRatings is included
					});
				} else {
					setError(data.message || "Member not found.");
				}
			} catch (err) {
				console.error("Error fetching member data:", err);
				setError("Error fetching member data.");
			} finally {
				setLoading(false);
			}
		};

		if (userData && userData.id) {
			fetchExtraData();
		} else {
			setError("User not logged in.");
			setLoading(false);
		}
	}, [userData.id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div style={styles.card}>
			<div style={styles.profileHeader}>
				<img
					src={
						extraData?.profilePictureURL ||
						"default_profile_pic.jpg"
					} // Updated here
					alt="Profile Pic"
					style={styles.image}
				/>
				<div>
					<h2 style={styles.name}>
						{extraData?.name || "No Name Provided"}
					</h2>{" "}
					{/* Use extraData.name */}
					<p>
						<strong>Care Dollars:</strong>{" "}
						{extraData?.careDollars || "N/A"}
					</p>
					<p>
						<strong>Phone:</strong> {extraData?.phone || "N/A"}
					</p>
					<p>
						<strong>Available Hours:</strong>{" "}
						{extraData?.timeAvailable || "N/A"}
					</p>
					<p>
						<strong>Email:</strong>{" "}
						{extraData?.email || "No Email Provided"}
					</p>
					<p>
						<strong>Address:</strong>{" "}
						{extraData?.address || "No Address Provided"}
					</p>
					<p>
						<strong>Last Ten Ratings:</strong>{" "}
						{extraData?.lastTenRatings || "N/A"}
					</p>
				</div>
			</div>
			<button style={styles.button} onClick={handleEditClick}>
				EDIT
			</button>
			<button
				style={{ ...styles.button, backgroundColor: "#1e423a" }}
				onClick={handleAddCareDollarsClick}
			>
				ADD Care Dollars
			</button>
			<button
				style={{ ...styles.button, backgroundColor: "#1e423a" }}
				onClick={handleCreateContractClick}
			>
				Create Contract
			</button>
			{showPopup && (
				<div style={styles.popupOverlay}>
					<div style={styles.popupContent}>
						<h3>Enter Amount of Care Dollars</h3>
						<input
							type="number"
							value={careDollarAmount}
							onChange={handleAmountChange}
							placeholder="Amount"
							style={styles.input}
							min="0"
						/>
						<div style={styles.popupActions}>
							<button
								style={styles.popupButton}
								onClick={handlePayClick}
							>
								Pay
							</button>
							<button
								style={styles.popupButton}
								onClick={() => setShowPopup(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const styles = {
	card: {
		width: "300px",
		backgroundColor: "#E9E9E9",
		padding: "20px",
		borderRadius: "10px",
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
		display: "flex",
		gap: "5px",
		flexDirection: "column",
		alignItems: "center",
	},
	profileHeader: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		gap: "10px",
	},
	image: {
		borderRadius: "50%",
		width: "100px",
		height: "100px",
		marginBottom: "20px",
		objectFit: "cover",
	},
	name: {
		fontSize: "22px",
		fontWeight: "bold",
		marginBottom: "10px",
		textAlign: "center",
	},
	info: {
		textAlign: "center",
		marginBottom: "20px",
	},
	button: {
		backgroundColor: "#1e90ff",
		color: "white",
		border: "none",
		padding: "10px 20px",
		borderRadius: "5px",
		cursor: "pointer",
		width: "100%",
		marginTop: "10px",
	},
	popupOverlay: {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	popupContent: {
		backgroundColor: "white",
		padding: "20px",
		borderRadius: "10px",
		width: "300px",
		textAlign: "center",
	},
	input: {
		width: "80%",
		padding: "10px",
		margin: "10px 0",
		borderRadius: "5px",
		border: "1px solid #ccc",
	},
	popupActions: {
		display: "flex",
		justifyContent: "space-between",
	},
	popupButton: {
		backgroundColor: "#1e90ff",
		color: "white",
		border: "none",
		padding: "10px 20px",
		borderRadius: "5px",
		cursor: "pointer",
	},
};

export default ProfileCard;
