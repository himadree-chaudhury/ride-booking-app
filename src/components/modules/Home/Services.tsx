import availabilityAnimationData from "@/assets/lottie/247 Available.json";
import bookAnimationData from "@/assets/lottie/Booking.json";
import safetyAnimationData from "@/assets/lottie/Car safety edit.json";
import mapAnimationData from "@/assets/lottie/Man waiting car.json";
import Lottie from "lottie-react";

const services = [
  {
    title: "Ride Booking",
    description:
      "Book a ride instantly with trusted drivers at transparent prices. Safe and reliable, anytime you need.",
    icon: mapAnimationData,
  },
  {
    title: "City-to-City",
    description:
      "Travel comfortably between cities with professional drivers and affordable fares.",
    icon: bookAnimationData,
  },
  {
    title: "Safety First",
    description:
      "All rides are GPS tracked with 24/7 support so you can travel with peace of mind.",
    icon: safetyAnimationData,
  },
  {
    title: "24/7 Availability",
    description:
      "Whether it’s early morning or late night, our rides are available around the clock.",
    icon: availabilityAnimationData,
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-2xl border p-6 text-center shadow-md transition duration-300 hover:shadow-xl"
          >
            <Lottie
              animationData={service.icon}
              loop
              style={{ width: "100px", height: "100px", marginBottom: "1rem" }}
            ></Lottie>
            <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
