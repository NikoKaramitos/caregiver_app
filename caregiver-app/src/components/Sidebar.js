import React, { useState } from "react";
import profilePic from "../images/profile_img.jpg";

const Sidebar = () => {
  const caregivers = [
    {
      name: "John Cena",
      rate: 30,
      image: profilePic,
      reviews: 4.5,
      services: 32,
      age: 35,
      state: "Florida",
      city: "Florida",
      statement:
        "John Felix Anthony Cena is an American actor and professional wrestler.",
      availability: "Mondays + Tuesdays + Fridays",
    },
    {
      name: "Mohamed Salah",
      rate: 30,
      image: profilePic,
      reviews: 5,
      services: 40,
      age: 31,
      state: "California",
      city: "Los Angeles",
      statement:
        "Mohamed Salah is a professional footballer known for his incredible speed and skill.",
      availability: "Mondays + Wednesdays + Fridays",
    },
    {
      name: "Will Smith",
      rate: 30,
      image: profilePic,
      reviews: 4,
      services: 28,
      age: 50,
      state: "California",
      city: "Hollywood",
      statement:
        "Will Smith is an American actor and rapper famous for blockbuster movies.",
      availability: "Tuesdays + Thursdays + Saturdays",
    },
    {
      name: "Selim Hani",
      rate: 30,
      image: profilePic,
      reviews: 3.5,
      services: 15,
      age: 28,
      state: "Texas",
      city: "Austin",
      statement:
        "Selim Hani is a caregiver with extensive experience in elderly care.",
      availability: "Wednesdays + Saturdays",
    },
  ];

  const [selectedCaregiver, setSelectedCaregiver] = useState(caregivers[0]);

  const handleSelectCaregiver = (caregiver) => {
    setSelectedCaregiver(caregiver);
  };
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    // const halfStar = rating % 1 !== 0;
    return (
      <span>
        {"★".repeat(fullStars)}
        {"☆".repeat(5 - Math.floor(rating))}
      </span>
    );
  };
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        {caregivers.map((caregiver, index) => (
          <div
            key={index}
            style={{
              ...styles.caregiverItem,
              ...(selectedCaregiver.name === caregiver.name &&
                styles.caregiverItemSelected),
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
              {/* <p>
                ⭐ {caregiver.reviews} ({caregiver.services} services)
              </p> */}
            </div>
          </div>
        ))}
      </div>
      <div style={styles.details}>
        <h2>{selectedCaregiver.name}</h2>
        <img
          src={selectedCaregiver.image}
          alt={selectedCaregiver.name}
          style={styles.detailsImage}
        />
        <p>
          <strong>Age:</strong> {selectedCaregiver.age}
        </p>
        <p>
          <strong>State:</strong> {selectedCaregiver.state}
        </p>
        <p>
          <strong>City:</strong> {selectedCaregiver.city}
        </p>
        <p>
          <strong>Statement:</strong> {selectedCaregiver.statement}
        </p>
        <p>
          <strong>Availability:</strong> {selectedCaregiver.availability}
        </p>
        <button style={styles.contactButton}>Contact</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
  },
  sidebar: {
    flex: 1,
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginRight: "20px",
  },
  caregiverItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  caregiverItemSelected: {
    backgroundColor: "#f0f0f0", // Light grey background when selected
    border: "2px solid #4CAF50", // Green border for selected item
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)", // Light shadow for selected item
  },
  image: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "15px",
  },
  details: {
    flex: 2,
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  detailsImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "15px",
  },
  contactButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Sidebar;
