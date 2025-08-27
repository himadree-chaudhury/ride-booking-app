import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@/components/ui/stepper";
import {
  useAcceptRideMutation,
  useCancelRideMutation,
  useCompleteRideMutation,
  usePickupRideMutation,
  useTransitRideMutation,
} from "@/redux/features/ride.api"; // <-- import toast
import type { IResponseError } from "@/types/error-type";
import type { RideStatus } from "@/types/ride-type";
import { useState } from "react";
import { toast } from "sonner";

const steps = [
  {
    step: 1,
    title: "Request Ride",
    description: "A request for a ride has been made.",
  },
  {
    step: 2,
    title: "Confirm Request / Cancel Request",
    description: "The ride request can be confirmed or canceled.",
  },
  {
    step: 3,
    title: "Pick-up",
    description: "The driver is on the way to pick you up.",
  },
  { step: 4, title: "In-transit", description: "The ride is in progress." },
  {
    step: 5,
    title: "Complete Ride",
    description: "The ride has been completed.",
  },
];

export default function RideStepper({
  rideId,
  status,
}: {
  rideId: string;
  status: RideStatus;
}) {
  const [acceptRide] = useAcceptRideMutation();
  const [cancelRide] = useCancelRideMutation();
  const [pickupRide] = usePickupRideMutation();
  const [transitRide] = useTransitRideMutation();
  const [completeRide] = useCompleteRideMutation();
  const [currentStep, setCurrentStep] = useState(
    status === "REQUESTED"
      ? 2
      : status === "ACCEPTED"
        ? 3
        : status === "PICKED_UP"
          ? 4
          : status === "IN_TRANSIT"
            ? 5
            : 5,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Processing...");
    try {
      switch (currentStep) {
        case 2:
          await acceptRide(rideId).unwrap();
          toast.success("Ride Accepted", { id: toastId });
          break;
        case 3:
          await pickupRide(rideId).unwrap();
          toast.success("Pickup Confirmed", { id: toastId });
          break;
        case 4:
          await transitRide(rideId).unwrap();
          toast.success("Ride Started", { id: toastId });
          break;
        case 5:
          await completeRide(rideId).unwrap();
          toast.success("Ride Completed", { id: toastId });
          break;
        default:
          break;
      }
      setCurrentStep((prev) => prev + 1);
    } catch (error: unknown) {
      const err = (error as unknown as { data: IResponseError }).data;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelRide = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Processing...");
    try {
      await cancelRide(rideId).unwrap();
      toast.success("Ride Canceled", { id: toastId });
    } catch (error: unknown) {
      const err = (error as unknown as { data: IResponseError }).data;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-2 space-y-8 text-center">
      <Stepper value={currentStep} onValueChange={setCurrentStep}>
        {steps.map(({ step, title, description }) => (
          <StepperItem
            key={step}
            step={step}
            loading={isLoading}
            className="relative flex-1 flex-col!"
          >
            <div className="flex flex-col items-center gap-3 rounded">
              <StepperIndicator />
              <div className="space-y-0.5 px-2 text-center">
                <StepperTitle>{title}</StepperTitle>
                <StepperDescription className="max-sm:hidden">
                  {description}
                </StepperDescription>
              </div>
            </div>
            {step < steps.length && (
              <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
            )}
          </StepperItem>
        ))}
      </Stepper>

      <div className="flex justify-center space-x-4">
        <Button
          variant="destructive"
          className="w-32"
          onClick={handleCancelRide}
          disabled={currentStep !== 2 || isLoading}
        >
          Cancel Ride
        </Button>
        <Button
          className="w-32"
          onClick={handleNextStep}
          disabled={currentStep > steps.length || isLoading}
        >
          {currentStep === 2
            ? "Accept Ride"
            : currentStep === 3
              ? "Confirm Pickup"
              : currentStep === 4
                ? "Start Ride"
                : "Complete Ride"}
        </Button>
      </div>
    </div>
  );
}
