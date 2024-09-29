// This filters component handles all filters UI display and consumes filters logic from Redux. It is being used in the main articles page.

import { useState, useCallback, useMemo } from "react";
import DatePicker from "react-datepicker";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

export default function Filters({ authors, sources, filters, setFilters }) {
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
  const [isSourceOpen, setIsSourceOpen] = useState(false);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const toggleAuthor = useCallback(() => setIsAuthorOpen((prev) => !prev), []);
  const toggleSource = useCallback(() => setIsSourceOpen((prev) => !prev), []);

  const sortedAuthors = useMemo(() => [...authors].sort(), [authors]);
  const sortedSources = useMemo(() => [...sources].sort(), [sources]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-2">Filters</h2>
      <div className="space-y-8">
        <div>
          <button
            onClick={toggleAuthor}
            className="flex justify-between items-center w-full p-2 bg-gray-800 rounded text-white"
            aria-expanded={isAuthorOpen}
            aria-controls="author-list"
          >
            <span className="font-medium">Authors</span>
            {isAuthorOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <AnimatePresence>
            {isAuthorOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul id="author-list" className="mt-2 max-h-48 overflow-y-auto">
                  {sortedAuthors.map((author) => (
                    <li key={author} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`author-${author}`}
                        checked={filters.author === author}
                        onChange={() =>
                          handleFilterChange(
                            "author",
                            author === filters.author ? "" : author
                          )
                        }
                        className="mr-2"
                      />
                      <label htmlFor={`author-${author}`} className="text-sm">
                        {author}
                      </label>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div>
          <button
            onClick={toggleSource}
            className="flex justify-between items-center w-full p-2 bg-gray-800 rounded text-white"
            aria-expanded={isSourceOpen}
            aria-controls="source-list"
          >
            <span className="font-medium">Sources</span>
            {isSourceOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <AnimatePresence>
            {isSourceOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul id="source-list" className="mt-2 max-h-48 overflow-y-auto">
                  {sortedSources.map((source) => (
                    <li key={source} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`source-${source}`}
                        checked={filters.sources.includes(source)}
                        onChange={(e) => {
                          const newSources = e.target.checked
                            ? [...filters.sources, source]
                            : filters.sources.filter((s) => s !== source);
                          handleFilterChange("sources", newSources);
                        }}
                        className="mr-2"
                      />
                      <label htmlFor={`source-${source}`} className="text-sm">
                        {source}
                      </label>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div>
          <label htmlFor="fromDate" className="block text-sm font-medium mb-1">
            Published Date
          </label>
          <DatePicker
            id="fromDate"
            selected={filters.fromDate}
            onChange={(date) => handleFilterChange("fromDate", date)}
            className="w-full p-2 bg-gray-800 rounded text-white"
            placeholderText="Select published date"
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={10}
          />
        </div>
      </div>
    </div>
  );
}