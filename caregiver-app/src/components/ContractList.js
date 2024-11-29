import React, { useState } from "react";
import ContractItem from "./ContractItem";

const ContractList = () => {
  const [activeTab, setActiveTab] = useState("Care Giving");
  const careGivingContracts = [
    {
      name: "John Cena",
      message: "sent you a contract",
      status: "new",
    },
    {
      name: "Will Smith",
      message: "has an active contract",
      status: "old",
      contactInfo: {
        phone: "123-456-7890",
        timings: "Mon-Fri, 9 AM - 5 PM",
      },
    },
    {
      name: "Mohamed Salah",
      message: "sent you a contract",
      status: "old",
      contactInfo: {
        phone: "123-456-7890",
        timings: "tues, thrus,Fri, 3 pM - 7 PM",
      },
    },
    {
      name: "Selim Hani",
      message: "has an active contract",
      status: "old",
      contactInfo: {
        phone: "987-654-3210",
        timings: "Mon-Fri, 10 AM - 4 PM",
      },
    },
  ];
  const careReceivingContracts = []; // Currently empty to display the placeholder

  return (
    <div style={styles.container}>
      {/* Tab Buttons */}
      <div style={styles.tabs}>
        <button
          style={activeTab === "Care Giving" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("Care Giving")}
        >
          Care Giving
        </button>
        <button
          style={activeTab === "Care Receiving" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("Care Receiving")}
        >
          Care Receiving
        </button>
      </div>

      {/* Tab Content */}
      <div style={styles.list}>
        {activeTab === "Care Giving" ? (
          careGivingContracts.map((contract, index) => (
            <ContractItem
              key={index}
              name={contract.name}
              message={contract.message}
              status={contract.status}
              contactInfo={contract.contactInfo}
            />
          ))
        ) : (
          <div style={styles.placeholder}>Nothing here yet</div>
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
    // backgroundColor: "#1e90ff",
    backgroundColor: "#f5f5f5",
    color: "black",
    border: "none",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minHeight: "200px",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    color: "#888",
    fontSize: "18px",
    fontStyle: "italic",
  },
};

export default ContractList;
