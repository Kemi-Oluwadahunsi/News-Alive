import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, CheckCircle } from "lucide-react";
import { toast, Toaster } from "sonner";

const SubscriptionModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset the form when the modal is opened
      setEmail("");
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log("Subscribing email:", email);
    toast.success("You have successfully subscribed to our newsletter!");
    setIsSubmitted(true);

    // Close the modal after a short delay
    setTimeout(() => {
      onClose();
    }, 1500); // Adjust this delay as needed
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 w-full"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Subscribe to Our Newsletter
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-gray-300">
                Stay up to date with our latest news and articles. Subscribe
                now!
              </p>
              <div className="flex items-center bg-gray-700 rounded-lg p-2">
                <Mail className="text-gray-400 mr-2" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="text-center">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
              <p className="text-xl font-semibold text-white mb-2">
                Thank you for subscribing!
              </p>
              <p className="text-gray-300">
                You&apos;ll now receive our latest news and articles directly in
                your inbox.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
      <Toaster position="top-right" richColors />
    </AnimatePresence>
  );
};

export default SubscriptionModal;
