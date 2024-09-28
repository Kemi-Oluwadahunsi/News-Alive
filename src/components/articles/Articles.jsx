import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { X } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import Filters from "../Filters";
import {
  setFilters,
  loadMoreArticles,
  resetFilters,
} from "../../../utils/redux/slices/articlesSlice";
import ArticleSkeleton from "./ArticleSkeleton";
import SearchBar from "../SearchBar";
import ArticleCard from "./ArticleCard";

export default function Articles() {
  const dispatch = useDispatch();
  const { items, filteredArticles, filters, loading, status } = useSelector(
    (state) => state.articles
  );
  
  const [visibleArticles, setVisibleArticles] = useState(12);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadMoreArticles());
    }
  }, [dispatch, status]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters({ ...filters, ...newFilters }));
  };

  const loadMore = () => {
    setVisibleArticles((prevVisible) => prevVisible + 6);
    dispatch(loadMoreArticles());
  };

  const handleResetFiltersAndSearch = () => {
    // setSearchTerm("");
    dispatch(resetFilters());
  };

  const categories = [
    ...new Set(items.map((article) => article.category).filter(Boolean)),
  ];
  const sources = [...new Set(items.map((article) => article.source.name))];

  const isSearching =
    filters.keyword !== "" ||
    filters.category !== "" ||
    filters.sources.length > 0 ||
    filters.fromDate !== null ||
    filters.toDate !== null;

  return (
    <div className="flex flex-col md:flex-row gap-8 py-8">
      <aside className="w-full md:w-1/4 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Search</h2>
          <SearchBar />
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full py-2 px-4 pr-10 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div> */}
        </div>

        <Filters
          categories={categories}
          sources={sources}
          filters={filters}
          setFilters={handleFilterChange}
        />

        {isSearching && (
          <motion.button
            onClick={handleResetFiltersAndSearch}
            className="w-2/3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={16} className="mr-2" />
            Reset Filters
          </motion.button>
        )}
      </aside>
      <main className="w-full md:w-3/4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">
            {isSearching ? "Search Results" : "Latest Articles"}
          </h1>
          {isSearching && filteredArticles.length === 0 ? (
            <p className="text-xl text-gray-400">
              No articles found matching your search criteria.
            </p>
          ) : (
            <>
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
                {loading &&
                  Array.from({ length: 3 }).map((_, index) => (
                    <ArticleSkeleton key={`skeleton-${index}`} />
                  ))}
              </div>
              {visibleArticles < filteredArticles.length && (
                <div className="text-center mt-12">
                  <motion.button
                    onClick={loadMore}
                    className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Load More"}
                  </motion.button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
}
