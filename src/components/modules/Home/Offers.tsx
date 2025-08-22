import { Button } from "@/components/ui/button";
import {
  addDays,
  differenceInCalendarDays,
  differenceInDays,
  endOfMonth,
  format,
  nextFriday,
} from "date-fns";
import { motion } from "motion/react";
import { BiSolidOffer } from "react-icons/bi";
import { MdDiscount } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const Offers = () => {
  // *Calculate The Next Friday's Date And Days Remaining
  const nextFridayFormatted = format(nextFriday(new Date()), "MMMM d, yyyy");
  const daysUntilFriday = differenceInCalendarDays(
    nextFriday(new Date()),
    new Date(),
  );

  // *Calculate The Last Day Of April And Days Remaining
  const lastAprilDate = endOfMonth(new Date(new Date().getFullYear(), 3));
  const lastDayOfApril = format(lastAprilDate, "MMMM d, yyyy");
  const daysLeftForApril = differenceInDays(lastAprilDate, new Date());

  // *Get Tomorrow's Date
  const formattedTomorrow = format(addDays(new Date(), 1), "MMMM d, yyyy");

  // *Animation Variants
  const cardVariants1 = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };
  const cardVariants2 = {
    initial: { y: 0 },
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        delay: 0.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };
  const cardVariants3 = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        delay: 0.4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  // *Background Gradient Animation
  const backgroundGradient = (delay = 1) => ({
    animate: {
      background: [
        "linear-gradient(90deg, #28b4df, #0078a6)",
        "linear-gradient(90deg, #9a5ae6, #6a2dbf)",
        "linear-gradient(90deg, #845ae6, #5429b3)",
      ],
      transition: {
        background: {
          duration: 5,
          delay,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        },
      },
    },
  });

  return (
    <div className="*:border-text-secondary-dark space-y-4 *:rounded-lg *:border md:relative *:md:w-[45%]">
      {/* Offer - 1: Unlimited 12% OFF */}
      <motion.div
        className="md:relative md:top-10"
        variants={cardVariants1}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.div
          className="flex flex-centric justify-between rounded-t-lg p-2 **:text-white"
          variants={backgroundGradient(0)}
        >
          <div>
            <p className="font-semibold">Unlimited</p>
            <h1 className="py-2 text-4xl font-extrabold">12% OFF !</h1>
            <p>Only {daysUntilFriday} days left...</p>
          </div>
          <motion.div
            className="w-32 -rotate-12"
            whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
          >
            <BiSolidOffer className="text-9xl" />
          </motion.div>
        </motion.div>
        <div className="mb-2 p-2">
          <div className="flex-centric justify-between">
            <h3>Get on every Friday!</h3>
            <h3>#1</h3>
          </div>
          <p className="mb-5">{nextFridayFormatted}</p>
          <Button variant="outline">More...</Button>
        </div>
      </motion.div>

      {/* Offer - 2: Limited $30 OFF */}
      <motion.div
        className="md:absolute md:bottom-10 md:left-[30%]"
        variants={cardVariants2}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.div
          className="flex flex-centric justify-between rounded-t-lg p-2 **:text-white"
          variants={backgroundGradient(0.5)}
        >
          <div>
            <p className="font-semibold">Limited</p>
            <h1 className="py-2 text-4xl font-extrabold">$30 OFF !</h1>
            <p>Only {daysLeftForApril} days left...</p>
          </div>
          <motion.div
            className="w-32 -rotate-12"
            whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
          >
            <MdDiscount className="text-9xl" />
          </motion.div>
        </motion.div>
        <div className="mb-2 p-2">
          <div className="flex-centric justify-between">
            <h3>Luxury cars this winter!</h3>
            <h3>#2</h3>
          </div>
          <p className="mb-5">{lastDayOfApril}</p>
          <Button variant="outline">More...</Button>
        </div>
      </motion.div>

      {/* Offer - 3: Limited $99/day */}
      <motion.div
        className="md:relative md:bottom-66 md:left-[55%]"
        variants={cardVariants3}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.div
          className="flex flex-centric justify-between rounded-t-lg p-2 **:text-white"
          variants={backgroundGradient(1)}
        >
          <div>
            <p className="font-semibold">Limited</p>
            <h1 className="py-2 text-4xl font-extrabold">$99/day</h1>
            <p>Only for five family members</p>
          </div>
          <motion.div
            className="w-32 -rotate-12"
            whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
          >
            <RiMoneyDollarCircleFill className="text-9xl" />
          </motion.div>
        </motion.div>
        <div className="p-2">
          <div className="flex-centric justify-between">
            <h3>#3</h3>
            <h3>Get on family package!</h3>
          </div>
          <p className="mb-2 text-right">{formattedTomorrow}</p>
          <div className="flex justify-end">
            <Button variant="outline">More...</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Offers;
