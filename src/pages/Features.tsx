import Heading from "@/components/modules/common/Heading";
import WhyUs from "@/components/modules/Features/WhyUs";

const Features = () => {
    return (
      <div>
        <Heading
          title={"ADVANTAGES"}
          heading={"Why Choose Us?"}
          description={
            "We present many guarantees and advantages when you rent a car with us for your trip"
          }
            />
            <WhyUs/>
      </div>
    );
};
export default Features;