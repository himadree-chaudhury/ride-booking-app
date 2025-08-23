import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();
  // *Animation Variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.25,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="flex-centric min-h-screen flex-col p-6 text-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <title>Error | Cabsy</title>
      {/* 404 Number */}
      <motion.div
        className="text-red-600 mb-8 text-[10rem] font-bold"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        404
      </motion.div>

      {/* Title */}
      <motion.h1 variants={item}>Oops! Lost in the Parking Lot</motion.h1>

      {/* Description */}
      <motion.p variants={item} className="mb-8 max-w-md text-lg">
        The page you're looking for has taken a wrong turn. Let's get you back
        on track.
      </motion.p>

      {/* Back Button */}
      <motion.button
        variants={item}
        onClick={() => navigate(-1)}
        className="group relative overflow-hidden outline-2 p-2 rounded-xl outline-foreground"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="inline-block"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Previous Page
        </span>
        <motion.span
          className="absolute inset-0 opacity-0 group-hover:opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Car Illustration */}
      <motion.div
        variants={item}
        className="mt-12 opacity-80 dark:opacity-60"
        whileHover={{ scale: 1.05 }}
      >
        <svg
          width="160"
          height="160"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <path
            d="M5 17H4C3.44772 17 3 16.5523 3 16V12C3 11.4477 3.44772 11 4 11H5M19 17H20C20.5523 17 21 16.5523 21 16V12C21 11.4477 20.5523 11 20 11H19M5 17V9C5 7.89543 5.89543 7 7 7H17C18.1046 7 19 7.89543 19 9V17M5 17H19M8 12H16M6.5 15C6.5 15.2761 6.27614 15.5 6 15.5C5.72386 15.5 5.5 15.2761 5.5 15C5.5 14.7239 5.72386 14.5 6 14.5C6.27614 14.5 6.5 14.7239 6.5 15ZM18.5 15C18.5 15.2761 18.2761 15.5 18 15.5C17.7239 15.5 17.5 15.2761 17.5 15C17.5 14.7239 17.7239 14.5 18 14.5C18.2761 14.5 18.5 14.7239 18.5 15Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Error;
