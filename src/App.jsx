import { useEffect, useCallback, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/landingPage/search/SearchBar";
import ScrollArrow from "./components/landingPage/staticComponents/ScrollArrow";
import LoadingFallback from "./components/pages/LoadingFallback";
import ErrorBoundary from "./components/pages/ErrorBoundary";
import {
  fetchArticles,
  setFilters,
  loadMoreArticles,
} from "../utils/redux/slices/articlesSlice";
import NotFound from "./components/pages/NotFound";
import ScrollToTop from "./components/pages/ScrollToTop";
import AboutPage from "./components/AboutPage";

const HeroSection = lazy(() => import("./components/HeroSection"));
const ArticleGrid = lazy(() => import("./components/articles/ArticleGrid"));
const Articles = lazy(() => import("./components/articles/Articles"));
const SingleArticlePage = lazy(() =>
  import("./components/articles/SingleArticlePage")
);
const SearchResults = lazy(() =>
  import("./components/landingPage/search/SearchResults")
);
const Contact = lazy(() => import("./components/Contact"));
const LandingPage = lazy(() => import("./components/landingPage/LandingPage"));

//Proper caching mechanism using React Query client for caching query results in memory
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // caching data after 5 minutes of fresh loading
      cacheTime: 60 * 60 * 1000, // removed data from memory after 60 minutes (1 hour)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});

// All routes logic are here, fully optimized by lazy loading components with React.lazy and Suspense, for display only when they are needed. ErrorBoundary catches errors in copmonents, NotFound component is displayed when a route visited is not included in the project, CSrollToTop component ensures that every component loads from the top of the page.
function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    items: filteredArticles,
    filters,
    page,
    loading,
    status,
  } = useSelector((state) => state.articles);
  const articlesPerPage = 6;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArticles());
    }
  }, [dispatch, status]);

  const filterArticles = useCallback(() => {
    dispatch(setFilters(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    filterArticles();
  }, [filterArticles]);

  const handleLoadMore = () => {
    dispatch(loadMoreArticles());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (status === "failed") {
    return (
      <div>
        <ErrorBoundary />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white max-w-[1440px] mx-auto">
      <Header />
      <ScrollArrow />
      <main className="container mx-auto px-4 md:px-12 pt-[4rem]">
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={location.pathname}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <SearchBar />
                      {filters.keyword ? (
                        <SearchResults />
                      ) : (
                        <>
                          <HeroSection />
                          <ArticleGrid />
                          <LandingPage />
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                }
              />
              <Route path="/article/:id" element={<SingleArticlePage />} />
              <Route
                path="/articles"
                element={
                  <Articles
                    loading={loading}
                    onLoadMore={handleLoadMore}
                    hasMore={
                      page * articlesPerPage < filteredArticles.length - 1
                    }
                  />
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}
