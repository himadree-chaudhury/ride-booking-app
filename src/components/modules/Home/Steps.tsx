import Stepper, { Step } from "@/components/ui/Stepper";
import { FaCalendarCheck, FaMapLocationDot, FaTrophy } from "react-icons/fa6";

const Steps = () => {
  const steps = [
    {
      title: "Choose Location",
      description: "Choose Destination Location To Find The Best Car.",
      icon: <FaMapLocationDot />,
    },
    {
      title: "Pick-Up Location",
      description: "Select Your Pick-Up Location.",
      icon: <FaCalendarCheck />,
    },
    {
      title: "Book Your Car",
      description: "Finalize Your Booking And Enjoy The Ride.",
      icon: <FaTrophy />,
    },
  ];
  return (
    <div>
      <Stepper
        initialStep={1}
        backButtonText="Previous"
        nextButtonText="Next"
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <div className="flex items-center">
              <span className="text-2xl">{step.icon}</span>
              <div className="ml-4">
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </div>
            </div>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};
export default Steps;
