// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Filter } from "lucide-react";
// import "react-datepicker/dist/react-datepicker.css";
// import Filters from "../Filters";
// import {
//   setFilters,
//   loadMoreArticles,
//   resetFilters,
// } from "../../../utils/redux/slices/articlesSlice";
// import SearchBar from "../landingPage/search/SearchBar";
// import ArticleCard from "./ArticleCard";

// export default function Articles() {
//   const dispatch = useDispatch();
//   const { items, filteredArticles, filters, loading, status } = useSelector(
//     (state) => state.articles
//   );

//   const [visibleArticles, setVisibleArticles] = useState(9);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [isFilterVisible, setIsFilterVisible] = useState(false);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(loadMoreArticles());
//     }
//   }, [dispatch, status]);

//   const handleFilterChange = (newFilters) => {
//     dispatch(setFilters({ ...filters, ...newFilters }));
//   };

//   const loadMore = () => {
//     setLoadingMore(true);
//     setVisibleArticles((prevVisible) => prevVisible + 3);
//     dispatch(loadMoreArticles());
//   };

//   useEffect(() => {
//     if (!loading && loadingMore) {
//       setLoadingMore(false);
//     }
//   }, [loading, loadingMore]);

//   const handleResetFiltersAndSearch = () => {
//     dispatch(resetFilters());
//   };

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible(!isFilterVisible);
//   };

//   const authors = [
//     ...new Set(items.map((article) => article.author).filter(Boolean)),
//   ];
//   const sources = [...new Set(items.map((article) => article.source.name))];

//   const isSearching =
//     filters.keyword !== "" ||
//     filters.author !== "" ||
//     filters.sources.length > 0 ||
//     filters.fromDate !== null ||
//     filters.toDate !== null;

//   const displayedArticles = isSearching ? filteredArticles : items;

//   return (
//     <div className="flex flex-col lg:flex-row gap-8 py-8">
//       <aside className="w-full lg:w-1/4 space-y-6">
//         <div>
//           <h2 className="text-xl font-bold mb-2">Search</h2>
//           <SearchBar />
//         </div>

//         <div className="lg:hidden">
//           <motion.button
//             onClick={toggleFilterVisibility}
//             className="w-full sm:w-[60%] mx-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Filter size={16} className="mr-2" />
//             {isFilterVisible ? "Hide Filters" : "Show Filters"}
//           </motion.button>
//         </div>

//         <AnimatePresence>
//           {(isFilterVisible || window.innerWidth >= 900) && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="space-y-6">
//                 <Filters
//                   authors={authors}
//                   sources={sources}
//                   filters={filters}
//                   setFilters={handleFilterChange}
//                 />

//                 {isSearching && (
//                   <motion.button
//                     onClick={handleResetFiltersAndSearch}
//                     className="w-full xl:w-[60%] bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <X size={16} className="mr-2" />
//                     Reset Filters
//                   </motion.button>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </aside>
//       <main className="w-full lg:w-3/4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className=" text-2xl lg:text-3xl xl:text-4xl font-bold mb-8">
//             Latest articles
//           </h1>
//           {displayedArticles.length === 0 ? (
//             <p className="text-xl text-gray-400">
//               No articles found matching your search criteria.
//             </p>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:gap-8">
//                 {displayedArticles
//                   .slice(0, visibleArticles)
//                   .map((article, index) => (
//                     <ArticleCard
//                       key={article.title}
//                       article={article}
//                       index={index}
//                     />
//                   ))}
//               </div>

//               {visibleArticles < displayedArticles.length && (
//                 <div className="text-center mt-12">
//                   <motion.button
//                     onClick={loadMore}
//                     className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     disabled={loadingMore}
//                   >
//                     {loadingMore ? "Loading..." : "Load More"}
//                   </motion.button>
//                 </div>
//               )}
//             </>
//           )}
//         </motion.div>
//       </main>
//     </div>
//   );
// }


import  { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import Filters from "../Filters";
import {
  setFilters,
  loadMoreArticles,
  resetFilters,
} from "../../../utils/redux/slices/articlesSlice";
import SearchBar from "../landingPage/search/SearchBar";
import ArticleCard from "./ArticleCard";
import LoadingFallback from "../page/LoadingFallback";

export default function Articles() {
  const dispatch = useDispatch();
  const { items, filteredArticles, filters, loading, status } = useSelector(
    (state) => state.articles
  );

  const [visibleArticles, setVisibleArticles] = useState(9);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadMoreArticles());
    }
  }, [dispatch, status]);

  const handleFilterChange = useCallback(
    (newFilters) => {
      dispatch(setFilters({ ...filters, ...newFilters }));
    },
    [dispatch, filters]
  );

  const loadMore = useCallback(() => {
    setLoadingMore(true);
    setVisibleArticles((prevVisible) => prevVisible + 3);
    dispatch(loadMoreArticles());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && loadingMore) {
      setLoadingMore(false);
    }
  }, [loading, loadingMore]);

  const handleResetFiltersAndSearch = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const toggleFilterVisibility = useCallback(() => {
    setIsFilterVisible((prev) => !prev);
  }, []);

  const authors = useMemo(
    () => [...new Set(items.map((article) => article.author).filter(Boolean))],
    [items]
  );

  const sources = useMemo(
    () => [...new Set(items.map((article) => article.source.name))],
    [items]
  );

  const isSearching = useMemo(
    () =>
      filters.keyword !== "" ||
      filters.author !== "" ||
      filters.sources.length > 0 ||
      filters.fromDate !== null ||
      filters.toDate !== null,
    [filters]
  );

  const displayedArticles = useMemo(
    () => (isSearching ? filteredArticles : items),
    [isSearching, filteredArticles, items]
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-8">
      <aside className="w-full lg:w-1/4 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Search</h2>
          <SearchBar />
        </div>

        <div className="lg:hidden">
          <motion.button
            onClick={toggleFilterVisibility}
            className="w-full sm:w-[60%] mx-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter size={16} className="mr-2" />
            {isFilterVisible ? "Hide Filters" : "Show Filters"}
          </motion.button>
        </div>

        <AnimatePresence>
          {(isFilterVisible || window.innerWidth >= 900) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <Filters
                  authors={authors}
                  sources={sources}
                  filters={filters}
                  setFilters={handleFilterChange}
                />

                {isSearching && (
                  <motion.button
                    onClick={handleResetFiltersAndSearch}
                    className="w-full xl:w-[60%] bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={16} className="mr-2" />
                    Reset Filters
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
      <main className="w-full lg:w-3/4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-8">
            Latest articles
          </h1>
          {loading && displayedArticles.length === 0 ? (
            <LoadingFallback />
          ) : displayedArticles.length === 0 ? (
            <p className="text-xl text-gray-400">
              No articles found matching your search criteria.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:gap-8">
                {displayedArticles
                  .slice(0, visibleArticles)
                  .map((article, index) => (
                    <ArticleCard
                      key={article.title}
                      article={article}
                      index={index}
                    />
                  ))}
              </div>

              {visibleArticles < displayedArticles.length && (
                <div className="text-center mt-12">
                  <motion.button
                    onClick={loadMore}
                    className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loadingMore}
                  >
                    {loadingMore ? "Loading..." : "Load More"}
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