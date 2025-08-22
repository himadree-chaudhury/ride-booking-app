const services = [
  {
    title: "Ride Booking",
    description:
      "Book a ride instantly with trusted drivers at transparent prices. Safe and reliable, anytime you need.",
    icon: "https://cdn.lordicon.com/tdrtiskw.json", // car
  },
  {
    title: "City-to-City",
    description:
      "Travel comfortably between cities with professional drivers and affordable fares.",
    icon: "https://cdn.lordicon.com/zzcjjxew.json", // map pin
  },
  {
    title: "Safety First",
    description:
      "All rides are GPS tracked with 24/7 support so you can travel with peace of mind.",
    icon: "https://cdn.lordicon.com/mrdiiocb.json", // shield
  },
  {
    title: "24/7 Availability",
    description:
      "Whether it’s early morning or late night, our rides are available around the clock.",
    icon: "https://cdn.lordicon.com/dxjqoygy.json", // clock
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-2xl p-6 text-center shadow-md transition duration-300 hover:shadow-xl"
            >
              <lord-icon
                src={service.icon}
                trigger="hover"
                style={{ width: "70px", height: "70px", marginBottom: "1rem" }}
              ></lord-icon>
              <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
    </section>
  );
};

export default ServicesSection;
