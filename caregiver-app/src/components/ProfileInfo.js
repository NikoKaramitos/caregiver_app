import React from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "../images/profile_img.jpg";

const ProfileInfo = ({ memberId }) => {
	const navigate = useNavigate();

	const handleEditClick = () => {
		navigate(`/editmember/${memberId}`);
	};

	return (
		<div style={styles.card}>
			<img src={profilePic} alt="John Cena" style={styles.image} />
			<h2 style={styles.name}>John Cena</h2>
			<div style={styles.info}>
				<p>Age: 30</p>
				<p>Address: 4122 Ursa Minor St.</p>
				<p>Email: john.cena@example.com</p>
				<p>Availability: .... ... ... ...</p>
				<p>Phone: 123-456-789</p>
			</div>
			<button style={styles.button} onClick={handleEditClick}>
				EDIT
			</button>
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
		flexDirection: "column",
		alignItems: "center",
	},
	image: {
		borderRadius: "50%",
		width: "100px",
		height: "100px",
		marginBottom: "20px",
	},
	name: {
		fontSize: "22px",
		fontWeight: "bold",
		marginBottom: "10px",
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
	},
};

export default ProfileInfo;
