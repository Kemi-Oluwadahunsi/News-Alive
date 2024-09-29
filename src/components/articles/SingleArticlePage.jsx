// This component handles the displaying of each article details. when any article card is clicked, it routes to this page where other data about the article clicked is viewed.

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Globe } from "lucide-react";

export default function SingleArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { items: articles } = useSelector((state) => state.articles);
  const { topics: trendingTopics } = useSelector((state) => state.trending);
  const article =
    articles.find((a) => a.title === decodeURIComponent(id)) ||
    trendingTopics.find((t) => t.title === decodeURIComponent(id));

  useEffect(() => {
    if (!article) {
      navigate("/404", { replace: true });
    }
  }, [article, navigate]);

  if (!article) {
    return null;
  }

  const handleBackClick = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <button
        onClick={handleBackClick}
        className="flex items-center text-blue-500 hover:text-blue-600 mb-8 transition-colors duration-200"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Articles
      </button>

      <article>
        <h1 className="text-4xl font-bold mb-6 text-gray-100">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center mb-6 text-sm text-gray-400">
          <span className="flex items-center mr-4 mb-2">
            <Calendar size={16} className="mr-2" />
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <span className="flex items-center mb-2">
            <Globe size={16} className="mr-2" />
            {article.source.name}
          </span>
        </div>
        <img
          src={article.urlToImage || "/placeholder.svg?height=400&width=800"}
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-xl leading-relaxed mb-8">{article.description}</p>
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Full Article</h2>
            <p className="text-gray-300 leading-relaxed">
              {article.content ||
                "Full article content is not available. Please visit the original source for the complete story."}
            </p>
          </div>
          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              Read Full Article on {article.source.name}
            </a>
          )}
        </div>
      </article>
    </motion.div>
  );
}