import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Search } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import Filters from "../Filters";
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
          src={article.urlToImage || "/placeholder.svg?height=200&width=400"}
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

export default function Articles({
  articles,
  sources,
  categories,
  loading,
  onLoadMore,
  hasMore,
}) {
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [visibleArticles, setVisibleArticles] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    sources: [],
    fromDate: null,
    toDate: null,
  });

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


  useEffect(() => {
    const filtered = articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !filters.category || article.category === filters.category;
      const matchesSources =
        filters.sources.length === 0 ||
        filters.sources.includes(article.source.name);
      const matchesDateRange =
        (!filters.fromDate ||
          new Date(article.publishedAt) >= filters.fromDate) &&
        (!filters.toDate || new Date(article.publishedAt) <= filters.toDate);

      return (
        matchesSearch && matchesCategory && matchesSources && matchesDateRange
      );
    });
    setFilteredArticles(filtered);
    setVisibleArticles(12);
  }, [articles, searchTerm, filters]);


  // const loadMore = () => {
  //   setVisibleArticles((prevVisible) => prevVisible + 6);
  // };

  return (
    <div className="flex flex-col md:flex-row gap-8 py-8">
      <aside className="w-full md:w-1/4 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Search</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-4 pr-10 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <Filters
          categories={categories}
          sources={sources}
          filters={filters}
          setFilters={setFilters}
        />
      </aside>
      <main className="w-full md:w-3/4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles
              .slice(0, visibleArticles)
              .map((article, index) => (
                <ArticleCard
                  key={article.title}
                  article={article}
                  index={index}
                />
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
          {/* {visibleArticles < filteredArticles.length && (
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
          )} */}
        </motion.div>
      </main>
    </div>
  );
}

