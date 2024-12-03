import React, { useState } from "react";
import Navbar from "../components/navbar";
import Carousel from "../components/Carousel";
import RegisterForm from "../components/RegisterForm";
import ParentForm from "../components/ParentForm";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

	const [userData, setUserData] = useState({
		name: "",
		email: "",
		address: "",
		phone: "",
		username: "",
		password: "",
		confirmPass: "",
    timeAvailable: 0,
	});

	const [parentData, setParentData] = useState({
		name: "",
		phone: "",
		address: "",
	});

	const handleFinalSubmit = async () => {
		// CHECK PASSWORD CONFIRMATION

		try {
			const userResponse = await fetch(
				"http://localhost:8000/register.php",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(userData),
				}
			);

			if (!userResponse.ok) throw new Error("User Registration failed.");

			const userResult = await userResponse.json();
			console.log("User Registration Response:", userResult);

			// Update parent data with the memberID
			const updatedParentData = {
				...parentData,
				memberID: userResult.memberID,
			};

			const parentResponse = await fetch(
				"http://localhost:8000/createparent.php",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updatedParentData),
				}
			);

			if (!parentResponse.ok)
				throw new Error("Parent Registration failed.");

			alert("Registration Successful!");

      navigate("/");

		} catch (error) {
			alert(`Error occured during registration: ${error.message}`);
		}

	};

	const steps = [
		{
			title: "User Information",
			content: (
				<RegisterForm formData={userData} setFormData={setUserData} />
			),
		},
		{
			title: "Parent Information",
			content: (
				<ParentForm
					formData={parentData}
					setFormData={setParentData}
					handleFinalSubmit={handleFinalSubmit}
				/>
			),
		},
	];
	// return <Carousel steps={steps} />;
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
