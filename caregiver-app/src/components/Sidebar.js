import React from "react";
import CareGiverItem from "./CareGiverItem";
import profilePic from "../images/profile_img.jpg";

const Sidebar = () => {
  const caregivers = [
    {
      name: "John Cena",
      rate: 30,
      image: profilePic,
      reviews: 4.5,
      services: 32,
    },
    {
      name: "Mohamed Salah",
      rate: 30,
      image: profilePic,
      reviews: 5,
      services: 40,
    },
    {
      name: "Will Smith",
      rate: 30,
      image: profilePic,
      reviews: 4,
      services: 28,
    },
    {
      name: "Selim Hani",
      rate: 30,
      image: profilePic,
      reviews: 3.5,
      services: 15,
    },
  ];

  return (
    <div style={styles.sidebar}>
      {caregivers.map((caregiver, index) => (
        <CareGiverItem
          key={index}
          name={caregiver.name}
          rate={caregiver.rate}
          image={caregiver.image}
          reviews={caregiver.reviews}
          services={caregiver.services}
        />
      ))}
    </div>
  );
};

const styles = {
  sidebar: {
    flex: 1,
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginRight: "20px",
  },
};

export default Sidebar;
