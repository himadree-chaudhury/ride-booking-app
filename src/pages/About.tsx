import Heading from "@/components/modules/common/Heading";

const About = () => {
  return (
    <div>
      <title>About | Cabsy</title>

      <Heading
        title={"WHO WE ARE"}
        heading={"About Cabsy"}
        description={
          "We’re redefining how people move around the city — safe, reliable, and always at your fingertips."
        }
      />

      {/* Mission & Values */}
      <section className="px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <img
              src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80"
              alt="Ride booking illustration"
              className="rounded-2xl shadow-md"
            />
          </div>
          <div>
            <p className="mb-6 text-lg">
              Cabsy was born from a simple idea: commuting should be simple,
              transparent, and stress-free. We want to make rides accessible for
              everyone — whether you’re heading to class, the office, or a trip
              across the city.
            </p>
            <ul className="space-y-4">
              <li>
                ✅ <span className="font-semibold">Safety First</span> — all
                rides are GPS-tracked and monitored.
              </li>
              <li>
                ✅ <span className="font-semibold">Fair Pricing</span> — no
                hidden charges, just clear and honest fares.
              </li>
              <li>
                ✅ <span className="font-semibold">24/7 Availability</span> —
                whenever you need a ride, we’re there.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team / Brand Highlight */}
      <section className="border-t py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="mb-12 text-3xl font-bold">Who We Are</h2>
          <div className="grid gap-8 *:border sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-xl p-6 shadow hover:shadow-md">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Team Member"
                className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
              />
              <h3 className="text-lg font-semibold">Himadree Chaudhury</h3>
              <p className="text-sm">Founder & CEO</p>
            </div>
            <div className="rounded-xl p-6 shadow hover:shadow-md">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Team Member"
                className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
              />
              <h3 className="text-lg font-semibold">Farhana Karim</h3>
              <p className="text-sm">Head of Operations</p>
            </div>
            <div className="rounded-xl p-6 shadow hover:shadow-md">
              <img
                src="https://randomuser.me/api/portraits/men/50.jpg"
                alt="Team Member"
                className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
              />
              <h3 className="text-lg font-semibold">Samiul Hasan</h3>
              <p className="text-sm">Lead Developer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
