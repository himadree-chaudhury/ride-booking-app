import face1 from "@/assets/images/uifaces-1.jpg";
import face2 from "@/assets/images/uifaces-2.jpg";
import face3 from "@/assets/images/uifaces-3.jpg";
import face4 from "@/assets/images/uifaces-4.jpg";
import Marquee from "react-fast-marquee";

const testimonials = [
  {
    name: "Mehedi Chowdhury",
    text: "Transparent pricing and on-time pickups. Exactly what I needed.",
    role: "Entrepreneur",
    img: face1,
  },
  {
    name: "Farzana Akter",
    text: "The drivers are polite and professional. Definitely my go-to ride app now.",
    role: "Marketing Executive",
    img: face2,
  },
  {
    name: "Samiul Hasan",
    text: "I love how smooth the booking experience is. The app feels intuitive and reliable.",
    role: "Software Engineer",
    img: face3,
  },
  {
    name: "Ayesha Rahman",
    text: "Cabsy made my daily commute so much easier. The rides are safe, quick, and affordable.",
    role: "Student, Dhaka University",
    img: face4,
  },
];

const Testimonials = () => {
  return (
    <div>
      <Marquee gradient={false} speed={50} pauseOnHover>
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="mx-6 my-8 max-w-xs flex-shrink-0 rounded-2xl border p-6 shadow-md"
          >
            <p className="mb-4 text-gray-700">“{t.text}”</p>
            <div className="flex items-center gap-5">
              <img
                src={t.img}
                alt={t.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};
export default Testimonials;
