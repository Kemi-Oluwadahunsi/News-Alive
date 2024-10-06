// This is a resuable searchbar component. It is being used on the landing page and in the articles main page. It consumes search values from Redux and it's used for seaching for articles by any keyword entered.

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { setFilters } from "../../../utils/redux/slices/articlesSlice";
import debounce from "lodash/debounce";

export default function SearchBar() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.articles);
  const [searchTerm, setSearchTerm] = useState(filters.keyword);

  const debouncedSearch = useCallback(
    (value) => {
      const debouncedDispatch = debounce((searchValue) => {
        dispatch(setFilters({ keyword: searchValue }));
      }, 300);
      debouncedDispatch(value);
    },
    [dispatch]
  );

  useEffect(() => {
    setSearchTerm(filters.keyword);
  }, [filters.keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters({ keyword: searchTerm }));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="my-4 max-w-96 mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <input
          type="search"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={handleChange}
          className="w-full py-2 px-4 pr-10 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <Search size={20} />
        </button>
      </div>
    </motion.form>
  );
}
