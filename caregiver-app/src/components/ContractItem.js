import React from "react";

const ContractItem = ({ contract, type, onApprove, onReject }) => {
	// Convert contract.approved to a boolean
	const isApproved = contract.approved === "1" || contract.approved === 1;

	return (
		<div style={styles.item}>
			<h3 style={styles.name}>
				{type === "receiving"
					? contract.caregiverName
					: contract.recipientName}
			</h3>
			<p style={styles.message}>
				{isApproved
					? "has an active contract with you"
					: "sent you a contract"}
			</p>
			<p>
				<strong>Parent Name:</strong> {contract.parentName}
			</p>
			<p>
				<strong>Weekly Hours:</strong> {contract.weeklyHours}
			</p>
			<p>
				<strong>Start Date:</strong>{" "}
				{new Date(contract.startDate * 86400000).toLocaleDateString()}
			</p>
			<p>
				<strong>End Date:</strong>{" "}
				{new Date(contract.endDate * 86400000).toLocaleDateString()}
			</p>
			{isApproved ? (
				<div>
					<p>
						<strong>Contact Info:</strong>{" "}
						{contract.caregiverPhone || contract.recipientPhone}
					</p>
				</div>
			) : (
				type === "receiving" && (
					<div>
						<button
							style={styles.button}
							onClick={() => onApprove(contract.contractID)}
						>
							Approve
						</button>
						<button
							style={{
								...styles.button,
								backgroundColor: "#e74c3c",
							}}
							onClick={() => onReject(contract.contractID)}
						>
							Decline
						</button>
					</div>
				)
			)}
		</div>
	);
};

const styles = {
	item: {
		padding: "15px",
		backgroundColor: "#f9f9f9",
		borderRadius: "8px",
		boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
	},
	name: {
		margin: "0 0 5px 0",
	},
	message: {
		margin: "0 0 10px 0",
		color: "#555",
	},
	button: {
		marginRight: "10px",
		padding: "8px 12px",
		backgroundColor: "#27ae60",
		color: "white",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
	},
};

export default ContractItem;
