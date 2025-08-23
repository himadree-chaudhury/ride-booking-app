import { motion } from "motion/react";
import {
  IoIosCheckbox,
  IoIosMedkit,
  IoIosPeople,
  IoIosPhotos,
  IoIosPricetags,
  IoIosRocket,
} from "react-icons/io";

// *Animation Variants
const cardVariants = {
  offscreenLeft: {
    x: -100,
    opacity: 0,
  },
  offscreenRight: {
    x: 100,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      bounce: 0.4,
      duration: 0.8,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3,
    },
  },
};

const WhyUs = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {/* First 3 Cards Animate From The Left */}
      {/* Card for Easy Booking */}

      <motion.div
        className="card flex-centric gap-5 p-2"
        initial="offscreenLeft"
        animate="onscreen"
        whileHover="hover"
        viewport={{ once: false, amount: 0.2 }}
        variants={cardVariants}
      >
        <IoIosRocket className="text-9xl" />
        <div className="space-y-3">
          <h3>Easy Booking</h3>
          <p>
            Book a car at our rental with an easy and fast process without
            disturbing your productivity
          </p>
        </div>
      </motion.div>

      {/* Card for Premium Quality */}
      <motion.div
        className="card flex-centric gap-5 p-2"
        initial="offscreenLeft"
        animate="onscreen"
        whileHover="hover"
        viewport={{ once: false, amount: 0.2 }}
        variants={cardVariants}
      >
        <IoIosCheckbox className="text-9xl" />
        <div className="space-y-3">
          <h3>Premium Quality</h3>
          <p>
            Our cars are always maintained engine health and cleanliness to
            provide a more comfortable driving experience
          </p>
        </div>
      </motion.div>

      {/* Card for Professional Agent */}
      <motion.div
        className="card flex-centric gap-5 p-2"
        initial="offscreenLeft"
        animate="onscreen"
        whileHover="hover"
        viewport={{ once: false, amount: 0.2 }}
        variants={cardVariants}
      >
        <IoIosPeople className="w-24 text-9xl" />
        <div className="space-y-3">
          <h3>Professional Agent</h3>
          <p>
            You can ask your travel companion to escort and guide your journey
          </p>
        </div>
      </motion.div>

      {/* Last 3 Cards Animate From The Right */}
      {/* Card for Safety */}

      <motion.div
        className="card flex-centric gap-5 p-2"
        initial="offscreenRight" // Start animation from right
        animate="onscreen"
        whileHover="hover"
        viewport={{ once: false, amount: 0.2 }}
        variants={cardVariants}
      >
        <IoIosMedkit className="text-9xl" />
        <div className="space-y-3">
          <h3>Car Safety</h3>
          <p>
            We guarantee the safety of the engine on the car always running well
            with regular checks on the car engine
          </p>
        </div>
      </motion.div>

      {/* Card for Refund */}
      <motion.div
        className="card flex-centric gap-5 p-2"
        initial="offscreenRight"
        animate="onscreen"
        whileHover="hover"
        viewport={{ once: false, amount: 0.2 }}
        variants={cardVariants}
      >
        <IoIosPricetags className="text-9xl" />
        <div className="space-y-3">
          <h3>Refund</h3>
          <p>
            Our service guarantee provides a money back opportunity if the car
            does not match the information provided
          </p>
        </div>
      </motion.div>

      {/* Card for Live Monitoring */}
      <motion.div
        className="card flex-centric gap-5 p-2"
        initial="offscreenRight"
        animate="onscreen"
        whileHover="hover"
        viewport={{ once: false, amount: 0.2 }}
        variants={cardVariants}
      >
        <IoIosPhotos className="text-9xl" />
        <div className="space-y-3">
          <h3>Live Monitoring</h3>
          <p>
            Our service provides direct customer monitoring to monitor trips in
            terms of safety and comfort
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WhyUs;
