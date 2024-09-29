// This component is used to display search results on the landing page. It takes in the filteredArticles and filters from the Redux store and displays them in a grid layout.

import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import ArticleCard from "../../articles/ArticleCard";

export default function SearchResults() {
  const { filteredArticles, filters } = useSelector((state) => state.articles);

  const searchResults = filteredArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      article.description.toLowerCase().includes(filters.keyword.toLowerCase())
  );

  return (
    <motion.section
      className="my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {searchResults.length === 0 ? (
        <p className="text-gray-400">
          No results found for &quot;{filters.keyword}&quot;.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      )}
    </motion.section>
  );
}