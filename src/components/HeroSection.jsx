// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function HeroSection({ article }) {
//   if (!article) return null;

//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="my-12 relative h-[70vh] rounded-xl overflow-hidden"
//     >
//       <div className="absolute inset-0 overflow-hidden">
//         <img
//           src={article.urlToImage}
//           alt={article.title}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
//       </div>
//       <div className="relative h-full flex items-end">
//         <div className="container mx-auto px-4 pb-12">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <span className="bg-blue-600 text-white px-2 py-1 text-sm uppercase tracking-wider rounded">
//               {article.source.name}
//             </span>
//             <h2 className="text-4xl font-bold mt-2 mb-4 max-w-2xl">
//               {article.title}
//             </h2>
//             <p className="text-gray-300 max-w-2xl mb-4">
//               {article.description}
//             </p>
//             <div className="flex items-center">
//               <span className="text-sm text-gray-400 mr-4">
//                 {new Date(article.publishedAt).toLocaleDateString()}
//               </span>
//               <Link
//                 to={`/article/${encodeURIComponent(article.title)}`}
//                 className="bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
//               >
//                 Read More
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </motion.section>
//   );
// }


// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const HeroCard = ({ article }) => (
//   <div className="relative h-[60vh] w-full overflow-hidden rounded-lg">
//     <img
//       src={article.urlToImage || "/placeholder.svg?height=400&width=800"}
//       alt={article.title}
//       className="absolute inset-0 h-full w-full object-cover"
//     />
//     <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
//     <div className="absolute bottom-0 left-0 p-6 text-white">
//       <h2 className="text-3xl font-bold mb-2">{article.title}</h2>
//       <p className="text-lg mb-4">{article.description}</p>
//       <Link
//         to={`/article/${encodeURIComponent(article.title)}`}
//         className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
//       >
//         Read More
//       </Link>
//     </div>
//   </div>
// );

// export default function HeroSection({ articles = [] }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const heroArticles = articles.slice(0, 3);

//   useEffect(() => {
//     if (heroArticles.length === 0) return;

//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % heroArticles.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [heroArticles.length]);

//   const handlePrev = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + heroArticles.length) % heroArticles.length
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % heroArticles.length);
//   };

//   const variants = {
//     enter: (direction) => ({
//       x: direction > 0 ? "100%" : "-100%",
//       opacity: 0,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//     },
//     exit: (direction) => ({
//       x: direction < 0 ? "100%" : "-100%",
//       opacity: 0,
//     }),
//   };

//   if (heroArticles.length === 0) {
//     return (
//       <section className="relative my-8 h-[60vh] bg-gray-800 rounded-lg flex items-center justify-center">
//         <p className="text-2xl text-white">No articles available</p>
//       </section>
//     );
//   }

//   return (
//     <section className="relative my-8">
//       <AnimatePresence initial={false} custom={currentIndex}>
//         <motion.div
//           key={currentIndex}
//           custom={currentIndex}
//           variants={variants}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           transition={{
//             // x: { type: "spring", stiffness: 300, damping: 30 },
//             opacity: { duration: 0.2 },
//           }}
//         >
//           <HeroCard article={heroArticles[currentIndex]} />
//         </motion.div>
//       </AnimatePresence>

//       {heroArticles.length > 1 && (
//         <>
//           <button
//             onClick={handlePrev}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
//             aria-label="Previous article"
//           >
//             <ChevronLeft size={24} />
//           </button>
//           <button
//             onClick={handleNext}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
//             aria-label="Next article"
//           >
//             <ChevronRight size={24} />
//           </button>

//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//             {heroArticles.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`w-3 h-3 rounded-full ${
//                   index === currentIndex
//                     ? "bg-blue-600"
//                     : "bg-white bg-opacity-50"
//                 } transition-all duration-300`}
//                 aria-label={`Go to article ${index + 1}`}
//               ></button>
//             ))}
//           </div>
//         </>
//       )}
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroCard = ({ article }) => (
  <div className="relative h-[60vh] w-full overflow-hidden rounded-lg">
    <img
      src={article.urlToImage || "/placeholder.svg?height=400&width=800"}
      alt={article.title}
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6 text-white">
      <h2 className="text-3xl font-bold mb-2">{article.title}</h2>
      <p className="text-lg mb-4">{article.description}</p>
      <Link
        to={`/article/${encodeURIComponent(article.title)}`}
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
      >
        Read More
      </Link>
    </div>
  </div>
);

export default function HeroSection({ articles = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroArticles = articles.slice(0, 3);

  useEffect(() => {
    if (heroArticles.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroArticles.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroArticles.length]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + heroArticles.length) % heroArticles.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroArticles.length);
  };

  if (heroArticles.length === 0) {
    return (
      <section className="relative my-8 h-[60vh] bg-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-2xl text-white">No articles available</p>
      </section>
    );
  }

  return (
    <section className="relative my-8">
      <HeroCard article={heroArticles[currentIndex]} />
      {heroArticles.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
            aria-label="Previous article"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
            aria-label="Next article"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex
                    ? "bg-blue-600"
                    : "bg-white bg-opacity-50"
                } transition-all duration-500`}
                aria-label={`Go to article ${index + 1}`}
              ></button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}