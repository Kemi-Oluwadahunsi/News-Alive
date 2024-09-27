import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function SingleArticlePage({ articles }) {
  const { id } = useParams();
  const article = articles.find((a) => a.title === decodeURIComponent(id));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <Link
        to="/"
        className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
      >
        <ArrowLeft className="mr-2" />
        Back to Articles
      </Link>
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="flex items-center mb-6">
        <span className="text-gray-400 mr-4">
          {new Date(article.publishedAt).toLocaleDateString()}
        </span>
        <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
          {article.source.name}
        </span>
      </div>
      <img
        src={article.urlToImage}
        alt={article.title}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />
      <p className="text-xl leading-relaxed mb-8">{article.description}</p>
      <div className="bg-gray-800 p-6 rounded-lg">
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
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          Read Full Article on {article.source.name}
        </a>
      )}
    </motion.div>
  );
}
