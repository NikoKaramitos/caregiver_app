import React from "react";
import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/navbar";
import loginPic from "../images/loginPic.png";

function Login() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row md:flex-row h-screen bg-white items-center justify-around px-8">
        <div className="w-1/2 flex flex-col items-left">
          <LoginHeader />
          <img
            src={loginPic}
            alt="Caregiver and Elderly Person"
            className="rounded-3xl w-full mt-10 mr-4 mb-12"
          ></img>
        </div>
        <div className="flex flex-col items-center mt-10">
          <div className="w-4/5">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
