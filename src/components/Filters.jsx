import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { X } from "lucide-react";

export default function Filters({ categories, sources, filters, setFilters }) {
  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      sources: [],
      fromDate: null,
      toDate: null,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-2">Filters</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full p-2 bg-gray-800 rounded text-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sources</label>
          <select
            multiple
            value={filters.sources}
            onChange={(e) =>
              handleFilterChange(
                "sources",
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="w-full p-2 bg-gray-800 rounded text-white"
          >
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">From Date</label>
          <DatePicker
            selected={filters.fromDate}
            onChange={(date) => handleFilterChange("fromDate", date)}
            className="w-full p-2 bg-gray-800 rounded text-white"
            placeholderText="Select start date"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To Date</label>
          <DatePicker
            selected={filters.toDate}
            onChange={(date) => handleFilterChange("toDate", date)}
            className="w-full p-2 bg-gray-800 rounded text-white"
            placeholderText="Select end date"
          />
        </div>
      </div>
      <motion.button
        onClick={resetFilters}
        className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <X size={16} className="mr-2" />
        Reset Filters
      </motion.button>
    </div>
  );
}
