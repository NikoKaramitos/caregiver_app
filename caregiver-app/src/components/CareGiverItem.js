import React from "react";

const CareGiverItem = ({ name, rate, image, reviews, services }) => {
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
    <div style={styles.item}>
      <img src={image} alt={name} style={styles.image} />
      <div style={styles.details}>
        <h3 style={styles.name}>{name}</h3>
        <p style={styles.rate}>${rate}/hr</p>
        <div style={styles.reviews}>
          {renderStars(reviews)} <span>({services} services)</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
  },
  image: {
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    marginRight: "15px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  name: {
    margin: "0",
    fontSize: "18px",
    fontWeight: "bold",
  },
  rate: {
    margin: "5px 0",
    color: "gray",
  },
  reviews: {
    display: "flex",
    alignItems: "center",
    color: "orange",
    fontSize: "14px",
  },
};

export default CareGiverItem;
