// This is a reusable component for the article cards UI. It takes in an article object and displays its title, author, and image. It also uses Framer Motion for animations and React Intersect Observer for lazy loading images and displaying cards when in the view port. The component is memoized to prevent unnecessary re-renders. 

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";


const ArticleCard = React.memo(({ article, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
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

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-800 rounded-lg h-[24rem] lg:h-[26rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <Link
        to={`/article/${encodeURIComponent(article.title)}`}
        className="block h-full"
        aria-label={`Read more about ${article.title}`}
      >
        <div className="relative h-48 overflow-hidden bg-gray-700">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          <img
            src={article.urlToImage || "/avatar.webp?height=200&width=400"}
            alt={imageError ? "Article image unavailable" : article.title}
            className={`w-full h-full object-cover transform hover:scale-110 transition-transform duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <div className="p-4 xl:p-6 h-[calc(100%-12rem)]">
          <h2 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-blue-400 transition-colors duration-300">
            {article.title}
          </h2>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {article.description}
          </p>
          <div className="flex items-center justify-between gap-4 absolute bottom-4 left-4 right-4">
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
});

ArticleCard.displayName = "ArticleCard";

export default ArticleCard;