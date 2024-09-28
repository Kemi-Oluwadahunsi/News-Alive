import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SearchResultCard = ({ article }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
  >
    <Link to={`/article/${encodeURIComponent(article.title)}`}>
      <img
        src={article.urlToImage || "/placeholder.svg?height=200&width=400"}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-white">
          {article.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4">{article.description}</p>
        <div className="flex justify-between items-center">
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

export default function SearchResults({ articles }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Search Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <SearchResultCard key={article.title} article={article} />
        ))}
      </div>
    </section>
  );
}
