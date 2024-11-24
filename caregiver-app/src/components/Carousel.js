import React, { useState } from "react";
import Card from "./Card";

function Carousel({ steps }) {
	const [activeStep, setActiveStep] = useState(0);

	// Functions for navigation
	const goToNextStep = () => {
		if (activeStep < steps.length - 1) {
			setActiveStep(activeStep + 1);
		}
	};

	const goToPreviousStep = () => {
		if (activeStep > 0) {
			setActiveStep(activeStep - 1);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="w-full max-w-lg p-8">
				<h2 className="text-2xl font-bold mb-4 text-center">
					{steps[activeStep].title}
				</h2>
				<div className="mb-8">
					{React.cloneElement(steps[activeStep].content, {
						goToNextStep,
						goToPreviousStep,
					})}
				</div>
			</Card>
		</div>
	);
}

export default Carousel;
