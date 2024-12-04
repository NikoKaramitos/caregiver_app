import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const [user, setUser] = useState({
    name: "John Doe", // Temporary placeholder for user data
    phone: "123-456-7890", // Temporary placeholder for phone
    address: "123 Main St", // Temporary placeholder for address
  });
  const [extraData, setExtraData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [careDollarAmount, setCareDollarAmount] = useState("");
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/editmember`);
  };

  const handleAddCareDollarsClick = () => {
    setShowPopup(true); // Show the popup
  };

  const handleAmountChange = (e) => {
    setCareDollarAmount(e.target.value); // Update the amount
  };

  const handlePayClick = () => {
    fetch("http://localhost/updateCareDollars.php?", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: careDollarAmount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          window.location.reload(); // Refresh the page to update data
          alert(data.message); // Success message from PHP
        } else {
        }
      })
      .catch((error) => {
        window.location.reload(); // Refresh the page to update data
        setShowPopup(false); // Close the popup after success
      });
  };

  useEffect(() => {
    const fetchExtraData = async () => {
      try {
        const response = await fetch(
          `http://localhost/getmemberinfo.php?memberID=1`
        );
        const data = await response.json();

        if (response.ok) {
          setExtraData(data);
        } else {
          setError(data.message || "Failed to fetch additional data.");
        }
      } catch (err) {
        setError("Error connecting to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchExtraData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.card}>
      <div style={styles.profileHeader}>
        <img
          src={extraData?.image || "default_profile_pic.jpg"}
          alt="Profile Pic"
          style={styles.image}
        />
        <div>
          <h2 style={styles.name}>{user.name}</h2>
          <p>
            <strong>Care Dollars:</strong> {extraData?.careDollars || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Available Hours:</strong> {extraData?.timeAvailable}
          </p>
        </div>

        <p>
          <strong>Email:</strong> {extraData?.email || "No Email For Now"}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <p>
          <strong>Last Ten Ratings:</strong>{" "}
          {extraData?.lastTenRatings || "N/A"}
        </p>
      </div>
      <button style={styles.button} onClick={handleEditClick}>
        EDIT
      </button>
      <button
        style={{ ...styles.button, backgroundColor: "#1e423a" }}
        onClick={handleAddCareDollarsClick}
      >
        ADD Care Dollars
      </button>

      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h3>Enter Amount of Care Dollars</h3>
            <input
              type="number"
              value={careDollarAmount}
              onChange={handleAmountChange}
              placeholder="Amount"
              style={styles.input}
            />
            <div style={styles.popupActions}>
              <button style={styles.popupButton} onClick={handlePayClick}>
                Pay
              </button>
              <button
                style={styles.popupButton}
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
    gap: "5px",
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
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "80%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  popupActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  popupButton: {
    backgroundColor: "#1e90ff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProfileCard;
