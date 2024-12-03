import React, { useState, useEffect } from "react";

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

	const handleContact = (caregiverName) => {
		alert(`You have contacted ${caregiverName}. He will contact you soon.`);
	};
	useEffect(() => {
		fetch("http://localhost:8000/getCareGivers.php")
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log("Fetched caregivers:", data);
				setCaregivers(data);
				setFilteredCaregivers(data);
				if (data.length > 0) setSelectedCaregiver(data[0]); // Select the first caregiver by default
			})
			.catch((error) => {
				console.error("Error fetching caregivers:", error);
			});
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
								selectedCaregiver.name === caregiver.name
									? styles.caregiverItemSelected
									: {}),
							}}
							onClick={() => handleSelectCaregiver(caregiver)}
						>
							<img
								src={caregiver.image}
								alt={caregiver.name}
								style={styles.image}
							/>
							<div>
								<h4>{caregiver.name}</h4>
								<p>${caregiver.rate}/hr</p>
								<div style={styles.reviews}>
									{renderStars(caregiver.reviews)}{" "}
									<span>({caregiver.services} services)</span>
								</div>
							</div>
						</div>
					))}
				</div>
				{selectedCaregiver && (
					<div style={styles.details}>
						<img
							src={selectedCaregiver.image}
							alt={selectedCaregiver.name}
							style={styles.detailsImage}
						/>
						<h2 style={styles.detailsName}>
							{selectedCaregiver.name}
						</h2>
						<p style={styles.detailsInfo}>
							<strong>Age:</strong> {selectedCaregiver.age}
						</p>
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
							<strong>Rating:</strong>{" "}
							{renderStars(selectedCaregiver.reviews)} (
							{selectedCaregiver.reviews} reviews)
						</p>
						<p style={styles.detailsInfo}>
							<strong>Num of Hours Available:</strong>{" "}
							{selectedCaregiver.services}
						</p>
						<button
							style={styles.contactButton}
							onMouseOver={(e) =>
								(e.target.style.backgroundColor = "#45a049")
							}
							onMouseOut={(e) =>
								(e.target.style.backgroundColor = "#4CAF50")
							}
							onClick={() =>
								handleContact(selectedCaregiver.name)
							}
						>
							Contact
						</button>
					</div>
				)}
			</div>
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
	contactButtonHover: {
		backgroundColor: "#45a049", // Slightly darker shade for hover effect
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
};

export default Sidebar;
