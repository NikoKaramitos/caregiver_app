import React from "react";
import loginPic from "../images/loginPic.png"

function LoginHeader() {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 p-6 w-1/2">
            <h1 className="text-4xl font-bold mb-4">
                Care Starts <span className="text-green-500">Here</span>
            </h1>
            <img
                src={loginPic}
                alt="Caregiver and Elderly Person"
                className="rounded-lg"
            >
            </img>
        </div>
    )
}

export default LoginHeader;