// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";

// export default function Articles({ articles }) {
//   const [visibleArticles, setVisibleArticles] = useState(12);

//   const loadMore = () => {
//     setVisibleArticles((prevVisible) => prevVisible + 6);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.5 }}
//       className="py-12"
//     >
//       <h1 className="text-4xl font-bold mb-8 text-center">Latest Articles</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         <AnimatePresence>
//           {articles.slice(0, visibleArticles).map((article, index) => (
//             <motion.div
//               key={article.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
//             >
//               <Link to={`/article/${encodeURIComponent(article.title)}`}>
//                 <img
//                   src={article.urlToImage}
//                   alt={article.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <h2 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-blue-400 transition-colors duration-300">
//                     {article.title}
//                   </h2>
//                   <p className="text-gray-400 text-sm mb-4 line-clamp-3">
//                     {article.description}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">
//                       {new Date(article.publishedAt).toLocaleDateString()}
//                     </span>
//                     <span className="text-sm font-medium text-blue-400">
//                       {article.source.name}
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//       {visibleArticles < articles.length && (
//         <div className="text-center mt-12">
//           <button
//             onClick={loadMore}
//             className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </motion.div>
//   );
// }


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ArticleCard = ({ article, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <Link to={`/article/${encodeURIComponent(article.title)}`}>
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-blue-400 transition-colors duration-300">
            {article.title}
          </h2>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {article.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
            <span className="text-sm font-medium text-blue-400">
              {article.source.name}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function Articles({ articles }) {
  const [visibleArticles, setVisibleArticles] = useState(12);

  const loadMore = () => {
    setVisibleArticles((prevVisible) => prevVisible + 6);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.slice(0, visibleArticles).map((article, index) => (
          <ArticleCard key={article.title} article={article} index={index} />
        ))}
      </div>
      {visibleArticles < articles.length && (
        <div className="text-center mt-12">
          <motion.button
            onClick={loadMore}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}