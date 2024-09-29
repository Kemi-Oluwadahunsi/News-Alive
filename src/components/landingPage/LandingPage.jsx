// This component contains some of the Home page sections, specifically the Trending topics section, Key features section, and the subscription section.

import { motion } from "framer-motion";
import Features from "./staticComponents/Features";
import SubscriptionModal from "./staticComponents/SubscriptionModal";
import { useState } from "react";
import TrendingTopics from "./TrendingTopics";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <div className="min-h-screen text-white mt-20">
        <section>
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">
              Discover News from Around the World
            </h2>

            <section className="py-16 px-4 md:px-8 bg-gray-800">
              <div className="container mx-auto">
                <TrendingTopics />
              </div>
            </section>
          </div>
        </section>

        <section>
          <Features />
        </section>

        <section className="py-16 px-4 md:px-8 relative">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Ready To Stay Informed?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who trust our app for their daily news.
            </p>
            <motion.button
              onClick={openModal}
              className="bg-blue-600 cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe Now
            </motion.button>
          </div>
          <div className="absolute top-[50%] left-0 right-0 bottom-full mb-4 z-50 flex items-center justify-center w-full">
            <SubscriptionModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </section>
      </div>
    </>
  );
}
