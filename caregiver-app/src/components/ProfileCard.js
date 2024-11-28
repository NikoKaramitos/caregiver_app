import React from "react";
import profilePic from "../images/profile_img.jpg";
const ProfileCard = () => {
  return (
    <div style={styles.content}>
      <div style={styles.profileHeader}>
        <img src={profilePic} alt="Profile Pic" style={styles.image} />
        <div>
          <h2 style={styles.name}>John Cena</h2>
          <p style={styles.rate}>$30/hr</p>
          <p>★★★★★ (32 reviews)</p>
        </div>
      </div>
      <div style={styles.details}>
        <p>
          <strong>Age:</strong> 35
        </p>
        <p>
          <strong>State:</strong> Florida
        </p>
        <p>
          <strong>City:</strong> Florida
        </p>
        <p>
          <strong>Statement:</strong> John Felix Anthony Cena is an American
          actor and professional wrestler...
        </p>
        <p>
          <strong>Availability:</strong> Mondays + Tuesdays + Fridays
        </p>
      </div>
      <a href="#" style={styles.contactButton}>
        Contact
      </a>
    </div>
  );
};

const styles = {
  content: {
    flex: 2,
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  image: {
    borderRadius: "50%",
    width: "80px",
    height: "80px",
    marginRight: "20px",
  },
  name: { margin: "0", fontSize: "24px" },
  rate: { margin: "5px 0", color: "gray" },
  details: { marginTop: "20px" },
  contactButton: {
    display: "inline-block",
    backgroundColor: "#27ae60",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default ProfileCard;
