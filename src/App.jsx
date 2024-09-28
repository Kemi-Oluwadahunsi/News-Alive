// import { useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useLocation,
// } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Header from "./components/Header";
// import HeroSection from "./components/HeroSection";
// import ArticleGrid from "./components/articles/ArticleGrid";
// import Footer from "./components/Footer";
// import SearchBar from "./components/landingPage/search/SearchBar";
// import Articles from "./components/articles/Articles";
// import SingleArticlePage from "./components/articles/SingleArticlePage";
// import SearchResults from "./components/landingPage/search/SearchResults";
// import {
//   fetchArticles,
//   setFilters,
//   loadMoreArticles,
// } from "../utils/redux/slices/articlesSlice";
// import Contact from "./components/Contact";
// import LandingPage from "./components/landingPage/LandingPage";
// import ScrollArrow from "./components/landingPage/staticComponents/ScrollArrow";

// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

// function AppContent() {
//   const dispatch = useDispatch();

//   const {
//     items:
//     filteredArticles,
//     filters,
//     page,
//     loading,
//     status,
//   } = useSelector((state) => state.articles);
//   const articlesPerPage = 6;

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchArticles());
//     }
//   }, [dispatch, status]);

//   const filterArticles = useCallback(() => {
//     dispatch(setFilters(filters));
//   }, [dispatch, filters]);

//   useEffect(() => {
//     filterArticles();
//   }, [filterArticles]);

//   const handleLoadMore = () => {
//     dispatch(loadMoreArticles());
//   };

//   if (status === "failed") {
//     return <div>Error loading articles. Please try again later.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white max-w-[1440px] mx-auto">
//       <Header />
//       <ScrollArrow />
//       <main className="container mx-auto px-4 md:px-12 pt-[4rem]">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <AnimatePresence>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <SearchBar />
//                   {filters.keyword ? (
//                     <SearchResults />
//                   ) : (
//                     <>
//                       <HeroSection />
//                       <ArticleGrid />
//                       <LandingPage />
//                     </>
//                   )}
//                 </motion.div>
//               </AnimatePresence>
//             }
//           />
//           <Route path="/article/:id" element={<SingleArticlePage />} />
//           <Route
//             path="/articles"
//             element={
//               <Articles
//                 loading={loading}
//                 onLoadMore={handleLoadMore}
//                 hasMore={page * articlesPerPage < filteredArticles.length - 1}
//               />
//             }
//           />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <ScrollToTop />
//       <AppContent />
//     </Router>
//   );
// }

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
import { ReactQueryDevtools } from "react-query/devtools";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/landingPage/search/SearchBar";
import ScrollArrow from "./components/landingPage/staticComponents/ScrollArrow";
import LoadingFallback from "./components/page/LoadingFallback";
import ErrorBoundary from "./components/page/ErrorBoundary";
import {
  fetchArticles,
  setFilters,
  loadMoreArticles,
} from "../utils/redux/slices/articlesSlice";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const dispatch = useDispatch();

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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
