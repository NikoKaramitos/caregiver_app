import React from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Profile from "../components/ProfileCard";
import Navbar from "../components/navbar";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <Sidebar />
        {/* <Profile /> */}
      </div>
    </div>
  );
}

const styles = {
  container: {
    // display: "flex",
    margin: "20px auto",
    maxWidth: "1200px",
  },
};

export default Dashboard;
