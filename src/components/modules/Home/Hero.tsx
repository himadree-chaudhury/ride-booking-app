import banner from "@/assets/images/cover.png";
import underline from "@/assets/images/underline.svg";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="md:relative">
      {/* Banner Image */}
      <div className="flex justify-center md:justify-end">
        <motion.img
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 0.5, duration: 1, ease: "easeIn" }}
          src={banner}
          alt="Cabsy Banner"
          className="object-cover md:w-[60%] xl:w-[40%]"
        />
      </div>
      <div className="top-5 md:absolute">
        {/* Heading */}
        <div className="p-5 pb-0 font-bold *:text-[min(8vw,50px)] lg:p-10">
          <motion.h1
            animate={{ x: [-1000, 50, 0] }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
          >
            Find, Rent, and
          </motion.h1>
          <motion.h1
            animate={{ x: [-1000, 50, 0] }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
          >
            Book ride in&nbsp;
            {/* Highlighted "Easy" With Underline */}
            <motion.div
              animate={{ x: 500 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="relative inline"
            >
              Easy&nbsp;
              <div className="absolute top-8 right-4 sm:top-14 sm:right-10">
                <motion.img
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 1.6, duration: 1, ease: "easeInOut" }}
                  src={underline}
                  alt="Underline"
                />
              </div>
            </motion.div>
          </motion.h1>
          <motion.h1
            animate={{ x: [-1000, 50, 0] }}
            transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
          >
            steps !
          </motion.h1>
        </div>
        {/* Subtext */}
        <div className="p-5 lg:p-0 lg:pl-10">
          <div className="text-subtle pb-5">
            <motion.p
              animate={{ y: [10, -10, 0], opacity: [0, 10, 1] }}
              transition={{ delay: 1.6, duration: 1, ease: "easeInOut" }}
            >
              Get or book a ride whenever
            </motion.p>
            <motion.p
              animate={{ y: [10, -10, 0], opacity: [0, 10, 1] }}
              transition={{ delay: 1.7, duration: 1, ease: "easeInOut" }}
            >
              and whenever you need
            </motion.p>
          </div>
          {/* Explore Button */}
          <motion.div
            animate={{ y: [-50, 10, 0], opacity: [0, 0.2, 0.5, 0.8, 1] }}
            transition={{ delay: 2, duration: 1, ease: "easeInOut" }}
          >
            <Button asChild>
              <Link to="/booking">Book Now</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
