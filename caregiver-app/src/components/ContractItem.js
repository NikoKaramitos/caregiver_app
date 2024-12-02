import React, { useState } from "react";
import profilePic from "../images/profile_img.jpg";

const ContractItem = ({ name, message, status, contactInfo }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleExploreClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div
      style={{
        ...styles.item,
        backgroundColor: status === "new" ? "green" : "grey",
        padding: "10px",
      }}
    >
      <img src={profilePic} alt={name} style={styles.image} />
      <div style={styles.details}>
        <strong>{name}</strong>
        <p>{message}</p>
        {status === "old" && (
          <div style={styles.contactInfo}>
            <p>Contact: {contactInfo.phone}</p>
            <p>Timings: {contactInfo.timings}</p>
          </div>
        )}
      </div>
      {status === "new" && (
        <button onClick={handleExploreClick} style={styles.checkButton}>
          Explore
        </button>
      )}

      {showPopup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <p>Here is the contract</p>
            <div style={styles.popupBtns}>
              <button
                onClick={handleClosePopup}
                style={{ ...styles.closeButton, backgroundColor: "green" }}
              >
                Accept
              </button>
              <button onClick={handleClosePopup} style={styles.closeButton}>
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    width: "60%",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    marginBottom: "15px",
    color: "white",
  },
  image: {
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    marginRight: "15px",
  },
  details: {
    flex: 1,
  },
  checkButton: {
    backgroundColor: "white",
    color: "green",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  contactInfo: {
    marginTop: "10px",
  },
  popup: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: "white",
    color: "black",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
  },
  popupBtns: {
    display: "flex",
    gap: "10px",
    marginTop: "30px",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default ContractItem;
