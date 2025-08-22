import Questions from "@/components/Accordion";
import Heading from "@/components/modules/common/Heading";

const Faq = () => {
  return (
    <div>
      <Heading
        title={"DOUBTS"}
        heading={"Frequently Asked Questions"}
        description={
          "Find answers to the most common questions about our services."
        }
      />

      <Questions />
    </div>
  );
};
export default Faq;
