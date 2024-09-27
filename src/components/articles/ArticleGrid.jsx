// import { useRef, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import ArticleSkeleton from "./ArticleSkeleton";

// export default function ArticleGrid({
//   articles,
//   loading,
//   onLoadMore,
//   hasMore,
// }) {
//   const observer = useRef();
//   const lastArticleRef = useCallback(
//     (node) => {
//       if (loading) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           onLoadMore();
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore, onLoadMore]
//   );

//   return (
//     <section className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//       {articles.map((article, index) => (
//         <motion.div
//           key={article.title}
//           ref={index === articles.length - 1 ? lastArticleRef : null}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: index * 0.1 }}
//           className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
//         >
//           <Link to={`/article/${encodeURIComponent(article.title)}`}>
//             <img
//               src={article.urlToImage}
//               alt={article.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2 line-clamp-2">
//                 {article.title}
//               </h3>
//               <p className="text-gray-400 text-sm mb-4 line-clamp-3">
//                 {article.description}
//               </p>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-500">
//                   {new Date(article.publishedAt).toLocaleDateString()}
//                 </span>
//                 <span className="text-sm font-medium text-blue-400">
//                   {article.source.name}
//                 </span>
//               </div>
//             </div>
//           </Link>
//         </motion.div>
//       ))}
//       {loading && (
//         <>
//           <ArticleSkeleton />
//           <ArticleSkeleton />
//           <ArticleSkeleton />
//         </>
//       )}
//     </section>
//   );
// }

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ArticleSkeleton from "./ArticleSkeleton";

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
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-blue-400 transition-colors duration-300">
            {article.title}
          </h3>
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

export default function ArticleGrid({
  articles,
  loading,
  onLoadMore,
  hasMore,
}) {
  const loadMoreControls = useAnimation();
  const [loadMoreRef, loadMoreInView] = useInView({
    triggerOnce: false,
    threshold: 1,
  });

  useEffect(() => {
    if (loadMoreInView && hasMore) {
      loadMoreControls.start({ opacity: 1, y: 0 });
    } else {
      loadMoreControls.start({ opacity: 0, y: 20 });
    }
  }, [loadMoreInView, hasMore, loadMoreControls]);

  return (
    <section className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <ArticleCard key={article.title} article={article} index={index} />
        ))}
      </div>
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <ArticleSkeleton />
          <ArticleSkeleton />
          <ArticleSkeleton />
        </div>
      )}
      {hasMore && (
        <motion.div
          ref={loadMoreRef}
          initial={{ opacity: 0, y: 20 }}
          animate={loadMoreControls}
          className="text-center mt-12"
        >
          <motion.button
            onClick={onLoadMore}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More
          </motion.button>
        </motion.div>
      )}
    </section>
  );
}