// This component displays when a non-included route is visited 

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 text-center"
    >
      <h1 className="text-6xl font-bold text-gray-100 mb-4">404</h1>
      <p className="text-2xl text-gray-300 mb-8">Page Not Found</p>
      <Link
        to="/"
        className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
