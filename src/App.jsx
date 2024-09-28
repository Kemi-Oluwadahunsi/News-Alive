import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ArticleGrid from "./components/articles/ArticleGrid";
// import Filters from "./components/Filters";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Articles from "./components/articles/Articles";
import SingleArticlePage from "./components/articles/SingleArticlePage";
import { demoArticles, demoSources, demoCategories } from "./demoData";
import { setCache, getCache } from "../utils/cache";
import SearchResults from "./components/SearchResults";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    sources: [],
    fromDate: "",
    toDate: "",
    keyword: "",
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const articlesPerPage = 6;

  useEffect(() => {
    const cachedArticles = getCache("articles");
    if (cachedArticles) {
      setArticles(cachedArticles);
      setFilteredArticles(cachedArticles);
      setLoading(false);
    } else {
      // Simulate API call
      setTimeout(() => {
        setArticles(demoArticles);
        setFilteredArticles(demoArticles);
        setCache("articles", demoArticles);
        setLoading(false);
      }, 1000);
    }
  }, []);

  const filterArticles = useCallback(() => {
    const filtered = articles.filter((article) => {
      return (
        (!filters.category || article.category === filters.category) &&
        (!filters.sources.length ||
          filters.sources.includes(article.source.name)) &&
        (!filters.keyword ||
          article.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
          article.description
            .toLowerCase()
            .includes(filters.keyword.toLowerCase())) &&
        (!filters.fromDate ||
          new Date(article.publishedAt) >= new Date(filters.fromDate)) &&
        (!filters.toDate ||
          new Date(article.publishedAt) <= new Date(filters.toDate))
      );
    });
    setFilteredArticles(filtered);
    setSearchResults(filtered);
    setPage(1);
  }, [articles, filters]);

  useEffect(() => {
    filterArticles();
  }, [filterArticles]);

  const loadMoreArticles = () => {
    setLoading(true);
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (searchTerm) => {
    setFilters((prevFilters) => ({ ...prevFilters, keyword: searchTerm }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white max-w-[1440px] mx-auto">
        <Header />
        <main className="container mx-auto px-4 md:px-12 pt-[4rem]">
          <Routes>
            <Route
              path="/"
              element={
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SearchBar onSearch={handleSearch} />
                    {filters.keyword ? (
                      <SearchResults articles={searchResults} />
                    ) : (
                      <>
                        <HeroSection articles={articles.slice(0, 3)} />
                        {/* <Filters
                          sources={demoSources}
                          categories={demoCategories}
                          filters={filters}
                          setFilters={setFilters}
                        /> */}
                        <ArticleGrid
                          articles={filteredArticles.slice(
                            1,
                            page * articlesPerPage + 1
                          )}
                          loading={loading}
                          onLoadMore={loadMoreArticles}
                          hasMore={
                            page * articlesPerPage < filteredArticles.length - 1
                          }
                        />
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              }
            />
            <Route
              path="/article/:id"
              element={<SingleArticlePage articles={articles} />}
            />
            <Route
              path="/articles"
              element={
                <Articles
                  articles={articles}
                  sources={demoSources}
                  categories={demoCategories}
                  loading={loading}
                  onLoadMore={loadMoreArticles}
                  hasMore={page * articlesPerPage < filteredArticles.length - 1}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
