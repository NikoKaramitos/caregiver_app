import React from "react";
import Navbar from "../components/navbar";
import Carousel from "../components/Carousel";
import RegisterForm from "../components/RegisterForm";
import ParentForm from "../components/ParentForm";

function Register () {
    const steps = [
        {
          title: "User Information",
          content: <RegisterForm />, // Replace with your form component
        },
        {
          title: "Parent Information",
          content: <ParentForm />, // Replace with your form component
        },
      ];

    return (
        <div>
            <Navbar />
            <div className="flex flex-col h-screen bg-white items-center justify-center px-8">
                <div className="w-full">
                    <Carousel steps={steps} />;
                </div>
            </div>
		</div>
    );
}
export default Register;