// This is a simple about page for this project, no much functionalities, basically a static page.

import { motion } from 'framer-motion';
import { Newspaper, Globe, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import SubscriptionModal from './landingPage/staticComponents/SubscriptionModal';
import aboutImage from "../assets/aboutImage.webp"

const AboutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const features = [
    { icon: Newspaper, title: 'Latest News', description: 'Stay informed with up-to-the-minute news from reliable sources.' },
    { icon: Globe, title: 'Global Coverage', description: 'Access news from around the world, covering diverse topics and regions.' },
    { icon: Users, title: 'User-Centric', description: 'Personalized news feed tailored to your interests and preferences.' },
    { icon: Zap, title: 'Fast & Responsive', description: 'Lightning-fast load times and a smooth, responsive user interface.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="sm:text-4xl text-2xl font-extrabold xl:text-6xl">
            About News Alive
          </h1>
          <p className="mt-3 max-w-md mx-auto text-xl text-gray-300 sm:text-2xl md:mt-5 md:max-w-3xl">
            Delivering the world&apos;s most important stories, right at your
            fingertips.
          </p>
        </div>

        <div className=" mt-12 sm:mt-16 lg:mt-20 xl:mt-24">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="pt-6"
              >
                <div className="flow-root bg-gray-800 rounded-lg px-6 pb-8 h-[12rem] lg:h-[14rem] xl:h-[12rem] ">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <feature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-white tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-5 text-base text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-4 sm:mt-16 lg:mt-20">
          <div className="flex flex-col-reverse gap-4 lg:flex-none lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-300 w-full lg:w-[90%]">
                At News Alive, we&apos;re committed to delivering
                accurate, timely, and relevant news to our users. Our mission is
                to keep you informed and empowered, helping you make sense of
                the world around you through high-quality journalism and
                cutting-edge technology.
              </p>
              <div className="mt-10 space-y-10 w-full lg:w-[90%]">
                {[
                  {
                    title: "Unbiased Reporting",
                    description:
                      "We strive to present news from multiple perspectives, ensuring a balanced view of world events.",
                  },
                  {
                    title: "User Privacy",
                    description:
                      "Your data privacy is our top priority. We never sell your personal information to third parties.",
                  },
                  {
                    title: "Continuous Improvement",
                    description:
                      "We're constantly updating our app with new features and optimizations based on user feedback.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 xl:h-12 xl:w-12 rounded-md bg-blue-500 text-white">
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-white">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-base text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
              <img
                className="relative mx-auto rounded-lg shadow-lg"
                width={700}
                src={aboutImage}
                alt="News app interface"
              />
            </div>
          </div>
        </div>

        <section className="py-16 px-4 md:px-8 relative mt-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              {" "}
              Ready To Stay Informed?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who trust our app for their daily news.
            </p>
            <motion.button
              onClick={openModal}
              className="bg-blue-600 cursor-pointer text-white px-6 py-2 lg:px-8 lg:py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
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
    </motion.div>
  );
};

export default AboutPage;