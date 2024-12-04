import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
	const [caregivers, setCaregivers] = useState([]);
	const [filteredCaregivers, setFilteredCaregivers] = useState([]);
	const [draftFilters, setDraftFilters] = useState({
		rate: "",
		rating: "",
		city: "",
	});
	const [filters, setFilters] = useState({ rate: "", rating: "", city: "" });
	const [selectedCaregiver, setSelectedCaregiver] = useState(null);

	// New state for rating modal
	const [showRateModal, setShowRateModal] = useState(false);
	const [selectedRating, setSelectedRating] = useState(0);
	const navigate = useNavigate();

	const userData = JSON.parse(localStorage.getItem("userData"));

	const handleEditClick = () => {
		navigate(`/editmember`);
	};

	const handleAddCareDollarsClick = () => {
		setShowPopup(true); // Show the popup
	};

	const [showPopup, setShowPopup] = useState(false);
	const [careDollarAmount, setCareDollarAmount] = useState("");

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
		const fetchCaregivers = async () => {
			try {
				const response = await fetch(
					"http://localhost/getCareGivers.php"
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				console.log("Fetched caregivers:", data);
				setCaregivers(data);
				setFilteredCaregivers(data);
				if (data.length > 0) setSelectedCaregiver(data[0]); // Select the first caregiver by default
			} catch (error) {
				console.error("Error fetching caregivers:", error);
			}
		};

		fetchCaregivers();
	}, []);

	const handleSelectCaregiver = (caregiver) => {
		setSelectedCaregiver(caregiver);
	};

	const handleDraftFilterChange = (e) => {
		const { name, value } = e.target;
		setDraftFilters((prev) => ({ ...prev, [name]: value }));
	};

	const applyFilters = () => {
		setFilters(draftFilters); // Update filters state when the "Apply" button is clicked
	};

	useEffect(() => {
		// Apply filtering logic whenever `filters` changes
		const filtered = caregivers.filter((caregiver) => {
			const matchesRate =
				filters.rate === "" || caregiver.rate <= parseInt(filters.rate);
			const matchesRating =
				filters.rating === "" ||
				caregiver.reviews >= parseInt(filters.rating);
			const matchesCity =
				filters.city === "" ||
				caregiver.city
					.toLowerCase()
					.includes(filters.city.toLowerCase());
			return matchesRate && matchesRating && matchesCity;
		});
		setFilteredCaregivers(filtered);
	}, [caregivers, filters]); // Re-run the filter whenever `filters` is updated

	const renderStars = (rating) => {
		const fullStars = Math.floor(rating);
		return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
	};

	const renderStars2 = (rating, isInteractive) => {
		return Array(5)
			.fill(null)
			.map((_, index) => (
				<span
					key={index}
					onClick={
						isInteractive
							? () => setSelectedRating(index + 1)
							: null
					}
					style={{
						fontSize: "24px",
						cursor: isInteractive ? "pointer" : "default",
						color: index < rating ? "#FFD700" : "#ccc",
					}}
				>
					★
				</span>
			));
	};

	const handleRatingSubmit = () => {
		if (selectedRating === 0) {
			alert("Please select a rating.");
			return;
		}

		alert(`You rated this caregiver ${selectedRating} stars.`);
		fetch("http://localhost:8000/adjustrating.php", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: selectedCaregiver.username, // Use
				newRating: selectedRating,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Rating submitted:", data);
				if (data.message) {
					alert(data.message);
					window.location.reload(); // Refresh the page to update data
				} else {
					alert("Failed to submit rating.");
				}
			})
			.catch((error) => {
				console.error("Error submitting rating:", error);
				alert("An error occurred while submitting the rating.");
			});
		setShowRateModal(false);
	};

	const handleContact = async (caregiver) => {
		// Retrieve recipientID from localStorage
		const userData = JSON.parse(localStorage.getItem("userData"));
		const recipientID = userData ? userData.id : null;

		if (!recipientID) {
			alert("You must be logged in to contact a caregiver.");
			return;
		}

		const caregiverID = caregiver.memberID; // Use memberID
		const message = 1; // This should ideally be user input

		try {
			const response = await fetch(
				"http://localhost:8000/createcontract.php",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ caregiverID, recipientID, message }),
				}
			);
			const data = await response.json();

			if (response.ok) {
				alert("Contract created successfully.");
			} else {
				alert("Error creating contract: " + data.message);
			}
		} catch (error) {
			console.error("Error creating contract:", error);
			alert("An error occurred while creating the contract.");
		}
	};

	if (caregivers.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div style={styles.container}>
			{/* Filters Section */}
			<div style={styles.filterContainer}>
				<input
					type="number"
					name="rate"
					placeholder="Max Rate ($)"
					value={draftFilters.rate}
					onChange={handleDraftFilterChange}
					style={styles.filterInput}
				/>
				<select
					name="rating"
					value={draftFilters.rating}
					onChange={handleDraftFilterChange}
					style={styles.filterDropdown}
				>
					<option value="">Min Rating</option>
					{[1, 2, 3, 4, 5].map((num) => (
						<option key={num} value={num}>
							{renderStars(num)}
						</option>
					))}
				</select>
				<input
					type="text"
					name="city"
					placeholder="City"
					value={draftFilters.city}
					onChange={handleDraftFilterChange}
					style={styles.filterInput}
				/>
				<button onClick={applyFilters} style={styles.applyButton}>
					Apply
				</button>
			</div>
			<div style={styles.container2}>
				<div style={styles.sidebar}>
					{/* Caregiver List */}
					{filteredCaregivers.map((caregiver, index) => (
						<div
							key={index}
							style={{
								...styles.caregiverItem,
								...(selectedCaregiver &&
								selectedCaregiver.memberID ===
									caregiver.memberID
									? styles.caregiverItemSelected
									: {}),
							}}
							onClick={() => handleSelectCaregiver(caregiver)}
						>
							<img
								src={
									caregiver.profilePictureURL ||
									"default_profile_pic.jpg"
								} // Updated here
								alt={caregiver.name}
								style={styles.image}
							/>
							<div>
								<h4>{caregiver.name}</h4>
								<p>${caregiver.rate}/hr</p>
								<div style={styles.reviews}>
									{renderStars(caregiver.reviews)}{" "}
									<span>({caregiver.services} reviews)</span>
								</div>
							</div>
						</div>
					))}
				</div>
				{selectedCaregiver && (
					<div style={styles.details}>
						<img
							src={
								selectedCaregiver.profilePictureURL ||
								"default_profile_pic.jpg"
							} // Updated here
							alt={selectedCaregiver.name}
							style={styles.detailsImage}
						/>
						<h2 style={styles.detailsName}>
							{selectedCaregiver.name}
						</h2>
						<p style={styles.detailsInfo}>
							<strong>State:</strong> {selectedCaregiver.state}
						</p>
						<p style={styles.detailsInfo}>
							<strong>City:</strong> {selectedCaregiver.city}
						</p>
						<p style={styles.detailsInfo}>
							<strong>Phone:</strong> {selectedCaregiver.phone}
						</p>
						<p style={styles.detailsInfo}>
							<strong>Email:</strong>{" "}
							{selectedCaregiver.email || "No Email Provided"}
						</p>
						<p style={styles.detailsInfo}>
							<strong>Address:</strong>{" "}
							{selectedCaregiver.address || "No Address Provided"}
						</p>
						<p style={styles.detailsInfo}>
							<strong>Rating:</strong>{" "}
							{renderStars(selectedCaregiver.reviews)} (
							{selectedCaregiver.services} reviews)
						</p>
						<p style={styles.detailsInfo}>
							<strong>Num of Hours Available:</strong>{" "}
							{selectedCaregiver.timeAvailable || "N/A"}
						</p>
						{/* <button
							style={styles.contactButton}
							onClick={() => handleContact(selectedCaregiver)} // Corrected here
						>
							Contact
						</button> */}
						<button
							style={styles.rateButton}
							onClick={() => setShowRateModal(true)}
						>
							Rate
						</button>
					</div>
				)}
			</div>

			{showRateModal && (
				<div style={styles.modalOverlay}>
					<div style={styles.modalContent}>
						<h3>Rate the Caregiver</h3>
						<div>{renderStars2(selectedRating, true)}</div>
						<button
							onClick={handleRatingSubmit}
							style={styles.submitButton}
						>
							Submit
						</button>
						<button
							onClick={() => setShowRateModal(false)}
							style={styles.cancelButton}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		height: "100vh",
		overflow: "hidden",
	},
	container2: {
		display: "flex",
		flex: 1,
		padding: "20px",
	},
	filterContainer: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "10px",
		backgroundColor: "#f9f9f9",
		borderBottom: "1px solid #ddd",
	},
	filterInput: {
		flex: 1,
		margin: "0 10px",
		padding: "8px",
		borderRadius: "5px",
		border: "1px solid #ccc",
	},
	filterDropdown: {
		flex: 1,
		margin: "0 10px",
		padding: "8px",
		borderRadius: "5px",
		border: "1px solid #ccc",
		backgroundColor: "white",
	},
	sidebar: {
		flex: 1,
		backgroundColor: "white",
		padding: "20px",
		borderRadius: "10px",
		boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
		marginRight: "20px",
		overflowY: "auto",
		maxHeight: "calc(100vh - 60px)", // Adjust for filters height
	},
	caregiverItem: {
		display: "flex",
		alignItems: "center",
		marginBottom: "20px",
		marginTop: "10px",
		cursor: "pointer",
		padding: "10px",
		borderRadius: "8px",
		transition: "all 0.1s ease",
		border: "0.1px solid #858383",
	},
	caregiverItemSelected: {
		backgroundColor: "#f0f0f0",
		border: "2px solid #4CAF50",
		boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
	},
	image: {
		width: "50px",
		height: "50px",
		borderRadius: "50%",
		marginRight: "15px",
		objectFit: "cover",
	},
	details: {
		flex: 1,
		backgroundColor: "#ffffff",
		padding: "20px",
		borderRadius: "10px",
		boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	detailsImage: {
		width: "120px",
		height: "120px",
		borderRadius: "50%",
		marginBottom: "15px",
		border: "2px solid #ddd",
		boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
		objectFit: "cover",
	},
	detailsName: {
		fontSize: "1.5em",
		fontWeight: "bold",
		color: "#333",
		marginBottom: "10px",
	},
	detailsInfo: {
		fontSize: "1em",
		color: "#555",
		margin: "5px 0",
	},
	contactButton: {
		backgroundColor: "#4CAF50",
		color: "white",
		padding: "10px 20px",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
		marginTop: "20px",
		fontSize: "1em",
		boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
		transition: "background-color 0.3s ease",
	},
	rateButton: {
		backgroundColor: "#4CAF50", // Changed to a more distinct color
		color: "white",
		padding: "10px 20px",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
		marginTop: "10px",
		fontSize: "1em",
		boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
		transition: "background-color 0.3s ease",
	},
	applyButton: {
		padding: "10px 20px",
		marginLeft: "10px",
		backgroundColor: "#4CAF50",
		color: "white",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
		fontSize: "1em",
		transition: "background-color 0.3s ease",
	},
	modalOverlay: {
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
	modalContent: {
		backgroundColor: "#fff",
		padding: "20px",
		borderRadius: "8px",
		width: "300px",
		textAlign: "center",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
	},
	submitButton: {
		marginTop: "10px",
		padding: "8px 16px",
		backgroundColor: "#28a745",
		color: "#fff",
		border: "none",
		borderRadius: "4px",
		cursor: "pointer",
	},
	cancelButton: {
		marginTop: "10px",
		marginLeft: "10px",
		padding: "8px 16px",
		backgroundColor: "#dc3545",
		color: "#fff",
		border: "none",
		borderRadius: "4px",
		cursor: "pointer",
	},
};

export default Sidebar;
