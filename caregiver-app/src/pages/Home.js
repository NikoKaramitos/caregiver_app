import React from "react";
import ProfileCard from "../components/ProfileCard";
import ContractList from "../components/ContractList";
import Navbar from "../components/navbar";

const Home = () => {
	return (
		<div>
			<Navbar />
			<div style={styles.container}>
				<ProfileCard />
				<ContractList />
			</div>
		</div>
	);
};

const styles = {
	container: {
		display: "flex",
		justifyContent: "space-between",
		padding: "0px 20px",
		backgroundColor: "#f5f5f5",
		height: "100vh",
	},
};

export default Home;
