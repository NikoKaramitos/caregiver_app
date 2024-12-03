import React from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Profile from "../components/ProfileCard";

function Dashboard() {
  return (
    <div>
      <Header />
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
