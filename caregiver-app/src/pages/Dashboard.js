import React from "react";
import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/navbar";
import loginPic from "../images/loginPic.png";

function Dashboard() {
	return (
		<div>
        <Navbar />
            <div className="flex flex-col items-center mt-10">
                <h1 className="text-5xl font-bold">Welcome to the Dashboard!</h1>
            </div>
        </div>
	);
}

export default Dashboard;
