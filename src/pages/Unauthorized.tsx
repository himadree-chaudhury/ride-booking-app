import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const Unauthorized = () => {
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
      className="flex-centric flex-col p-6 text-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <title>Unauthorized | Cabsy</title>

      {/* 401 Number */}
      <motion.div
        className="mb-8 text-[8rem] font-extrabold text-yellow-600"
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        403
      </motion.div>

      {/* Title */}
      <motion.h1 variants={item}>Access Denied</motion.h1>

      {/* Description */}
      <motion.p variants={item} className="mb-8 max-w-md text-lg">
        It looks like you don’t have access to this page. If you think you
        should, please reach out to your administrator.
      </motion.p>

      {/* Back Button */}
      <motion.button
        variants={item}
        onClick={() => navigate(-1)}
        className="group outline-foreground relative overflow-hidden rounded-xl p-2 outline-2"
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

      {/* Lock Illustration */}
      <motion.div
        variants={item}
        className="mt-12 opacity-80 dark:opacity-60"
        whileHover={{ scale: 1.05 }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-yellow-600"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Unauthorized;
