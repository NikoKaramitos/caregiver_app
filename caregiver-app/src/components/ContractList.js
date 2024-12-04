import React, { useState, useEffect, useCallback } from "react";
import ContractItem from "./ContractItem";

const ContractList = () => {
	const [activeTab, setActiveTab] = useState("Care Receiving");
	const [careReceivingContracts, setCareReceivingContracts] = useState([]);
	const [careGivingContracts, setCareGivingContracts] = useState([]);
	const [loading, setLoading] = useState(true);

	const userData = JSON.parse(localStorage.getItem("userData"));
	const memberID = userData ? userData.id : null;

	const fetchContracts = useCallback(async () => {
		if (!memberID) {
			alert("You must be logged in to view contracts.");
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:8000/getContracts.php?memberID=${memberID}`
			);
			const data = await response.json();

			if (response.ok) {
				setCareReceivingContracts(data.careReceivingContracts || []);
				setCareGivingContracts(data.careGivingContracts || []);
			} else {
				console.error("Error fetching contracts:", data.message);
				setCareReceivingContracts([]);
				setCareGivingContracts([]);
			}
		} catch (error) {
			console.error("Error fetching contracts:", error);
			setCareReceivingContracts([]);
			setCareGivingContracts([]);
		} finally {
			setLoading(false);
		}
	}, [memberID]);

	useEffect(() => {
		fetchContracts();
	}, [fetchContracts]);

	const handleApprove = async (contractID) => {
		try {
			const response = await fetch(
				`http://localhost:8000/approveContract.php`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ contractID }),
				}
			);
			const data = await response.json();

			if (response.ok) {
				alert("Contract approved successfully.");
				fetchContracts(); // Refresh the contracts list
			} else {
				alert("Error approving contract: " + data.message);
			}
		} catch (error) {
			console.error("Error approving contract:", error);
			alert("An error occurred while approving the contract.");
		}
	};

	const handleReject = async (contractID) => {
		try {
			const response = await fetch(
				`http://localhost:8000/rejectContract.php`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ contractID }),
				}
			);
			const data = await response.json();

			if (response.ok) {
				alert("Contract rejected successfully.");
				fetchContracts(); // Refresh the contracts list
			} else {
				alert("Error rejecting contract: " + data.message);
			}
		} catch (error) {
			console.error("Error rejecting contract:", error);
			alert("An error occurred while rejecting the contract.");
		}
	};

	if (loading) {
		return <div>Loading contracts...</div>;
	}

	return (
		<div style={styles.container}>
			{/* Tab Buttons */}
			<div style={styles.tabs}>
				<button
					style={
						activeTab === "Care Receiving"
							? styles.activeTab
							: styles.tab
					}
					onClick={() => setActiveTab("Care Receiving")}
				>
					Care Receiving
				</button>
				<button
					style={
						activeTab === "Care Giving"
							? styles.activeTab
							: styles.tab
					}
					onClick={() => setActiveTab("Care Giving")}
				>
					Care Giving
				</button>
			</div>

			{/* Tab Content */}
			<div style={styles.list}>
				{activeTab === "Care Receiving" ? (
					careReceivingContracts.length > 0 ? (
						careReceivingContracts.map((contract) => (
							<ContractItem
								key={contract.contractID}
								contract={contract}
								type="receiving"
								onApprove={handleApprove}
								onReject={handleReject}
							/>
						))
					) : (
						<div style={styles.placeholder}>
							No care receiving contracts.
						</div>
					)
				) : careGivingContracts.length > 0 ? (
					careGivingContracts.map((contract) => (
						<ContractItem
							key={contract.contractID}
							contract={contract}
							type="giving"
						/>
					))
				) : (
					<div style={styles.placeholder}>
						No care giving contracts.
					</div>
				)}
			</div>
		</div>
	);
};

const styles = {
	container: {
		flex: 1,
		backgroundColor: "white",
		padding: "20px",
		borderRadius: "10px",
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
	},
	tabs: {
		display: "flex",
		marginBottom: "20px",
	},
	tab: {
		flex: 1,
		padding: "10px",
		textAlign: "center",
		backgroundColor: "#f5f5f5",
		color: "#8B8989",
		border: "none",
		cursor: "pointer",
	},
	activeTab: {
		flex: 1,
		padding: "10px",
		textAlign: "center",
		backgroundColor: "#e0e0e0",
		color: "black",
		border: "none",
	},
	list: {
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		minHeight: "200px",
		justifyContent: "flex-start",
		alignItems: "stretch",
	},
	placeholder: {
		color: "#888",
		fontSize: "18px",
		fontStyle: "italic",
	},
};

export default ContractList;
