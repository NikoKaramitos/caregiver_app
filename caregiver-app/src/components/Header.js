import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      {/* <a href="/dashboard" style={styles.logo}>
        We
        <span></span>
        Care
      </a> */}
      <a href="/dashboard" className="text-2xl font-bold">
        <span className="text-green-500">We</span>Care
      </a>
      <a href="/home" style={styles.link}>
        Home
      </a>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "white",
    padding: "10px 60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    color: "#27ae60",
    fontWeight: "bold",
    fontSize: "24px",
  },
  link: {
    textDecoration: "none",
    color: "gray",
    fontSize: "18px",
  },
};

export default Header;
