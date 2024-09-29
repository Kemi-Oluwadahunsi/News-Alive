// This is the component for the article cards for the Latest Articles section on the Home page. It takes in the articles from the Redux store and displays them in a grid format. It fetches the 6 articles for display with a See all articles button which redirects to the main articles page on clicking it.

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingFallback from "../pages/LoadingFallback";
import ArticleCard from "./ArticleCard";

const ArticleGrid = () => {
  const { items: articles, loading } = useSelector((state) => state.articles);
  const displayedArticles = articles.slice(7, 13);

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
      {loading ? (
        <LoadingFallback />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {displayedArticles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      )}
      <div className="text-center mt-12">
        <Link to="/articles">
          <motion.button
            className="bg-blue-600 text-white text-base lg:text-lg px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See all articles
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default ArticleGrid;
