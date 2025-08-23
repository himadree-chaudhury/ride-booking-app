import Heading from "@/components/modules/common/Heading";
import Hero from "@/components/modules/Home/Hero";
import Offers from "@/components/modules/Home/Offers";
import Services from "@/components/modules/Home/Services";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";

const Home = () => {
  return (
    <div>
      <section className="mb-10">
        <Hero />
      </section>
      <Heading
        title={"SERVICES"}
        heading={"Explore Our Services"}
        description={"Discover a range of services tailored to your needs."}
      />
      <section>
        <Services />
      </section>

      <Heading
        title={"HOW IT WORK"}
        heading={"Book With Following Steps"}
        description={
          "Easily find the perfect car, set your pick-up time, and enjoy seamless delivery to your location"
        }
      />
      <section>
        <Steps />
      </section>

      <Heading
        title={"COUPONS"}
        heading={"Special Offers"}
        description={
          "Get the best and most exciting bonus today on your journey"
        }
      />
      <section className="mb-16">
        <Offers />
      </section>

      <Heading
        title={"TESTIMONIALS"}
        heading={"What Our Customers Say"}
        description={
          "We value our customers' feedback and continuously strive to improve our services."
        }
      />

      <section>
        <Testimonials />
      </section>
    </div>
  );
};
export default Home;
