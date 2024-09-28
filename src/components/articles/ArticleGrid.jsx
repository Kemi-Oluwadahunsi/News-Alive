
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArticleSkeleton from "./ArticleSkeleton";
import ArticleCard from "./ArticleCard";



export default function ArticleGrid() {
  const { items: articles, loading } = useSelector((state) => state.articles);
  const displayedArticles = articles.slice(7, 13);

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <ArticleSkeleton key={index} />
            ))
          : displayedArticles.map((article) => (
              <ArticleCard key={article.title} article={article} />
            ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/articles">
          <motion.button
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See all articles
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
