import { motion } from "motion/react";

const Heading = ({
  title,
  heading,
  description,
}: {
  title: string;
  heading: string;
  description: string;
}) => {
  return (
    <div className="text-center">
      {/* Title */}
      <motion.p
        className="font-semibold text-[#005a91]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {title}
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {heading}
      </motion.h2>

      {/* Description */}
      <motion.p
        className="pb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        {description}
      </motion.p>
    </div>
  );
};

export default Heading;
