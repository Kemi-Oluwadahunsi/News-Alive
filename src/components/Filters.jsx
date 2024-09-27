// import { motion } from "framer-motion";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function Filters({ sources, categories, filters, setFilters }) {
//   const handleFilterChange = (name, value) => {
//     setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
//   };

//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="my-8 p-6 bg-gray-800 rounded-lg shadow-lg"
//     >
//       <h2 className="text-2xl font-bold mb-4">Filters</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Category</label>
//           <select
//             value={filters.category}
//             onChange={(e) => handleFilterChange("category", e.target.value)}
//             className="w-full p-2 bg-gray-700 rounded text-white"
//           >
//             <option value="">All Categories</option>
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Sources</label>
//           <select
//             multiple
//             value={filters.sources}
//             onChange={(e) =>
//               handleFilterChange(
//                 "sources",
//                 Array.from(e.target.selectedOptions, (option) => option.value)
//               )
//             }
//             className="w-full p-2 bg-gray-700 rounded text-white"
//           >
//             {sources.map((source) => (
//               <option key={source} value={source}>
//                 {source}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Keyword</label>
//           <input
//             type="text"
//             value={filters.keyword}
//             onChange={(e) => handleFilterChange("keyword", e.target.value)}
//             className="w-full p-2 bg-gray-700 rounded text-white"
//             placeholder="Search articles..."
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">From Date</label>
//           <DatePicker
//             selected={filters.fromDate ? new Date(filters.fromDate) : null}
//             onChange={(date) =>
//               handleFilterChange("fromDate", date.toISOString())
//             }
//             className="w-full p-2 bg-gray-700 rounded text-white"
//             placeholderText="Select start date"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">To Date</label>
//           <DatePicker
//             selected={filters.toDate ? new Date(filters.toDate) : null}
//             onChange={(date) =>
//               handleFilterChange("toDate", date.toISOString())
//             }
//             className="w-full p-2 bg-gray-700 rounded text-white"
//             placeholderText="Select end date"
//           />
//         </div>
//       </div>
//       <button
//         onClick={() =>
//           setFilters({
//             category: "",
//             sources: [],
//             fromDate: "",
//             toDate: "",
//             keyword: "",
//           })
//         }
//         className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//       >
//         Reset Filters
//       </button>
//     </motion.section>
//   );
// }


import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Filters({ sources, categories, filters, setFilters }) {
  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="my-8 p-6 bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white"
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
            className="w-full p-2 bg-gray-700 rounded text-white"
          >
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Keyword</label>
          <input
            type="text"
            value={filters.keyword}
            onChange={(e) => handleFilterChange("keyword", e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white"
            placeholder="Search articles..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">From Date</label>
          <DatePicker
            selected={filters.fromDate ? new Date(filters.fromDate) : null}
            onChange={(date) =>
              handleFilterChange("fromDate", date ? date.toISOString() : "")
            }
            className="w-full p-2 bg-gray-700 rounded text-white"
            placeholderText="Select start date"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To Date</label>
          <DatePicker
            selected={filters.toDate ? new Date(filters.toDate) : null}
            onChange={(date) =>
              handleFilterChange("toDate", date ? date.toISOString() : "")
            }
            className="w-full p-2 bg-gray-700 rounded text-white"
            placeholderText="Select end date"
          />
        </div>
      </div>
      <motion.button
        onClick={() =>
          setFilters({
            category: "",
            sources: [],
            fromDate: "",
            toDate: "",
            keyword: "",
          })
        }
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Reset Filters
      </motion.button>
    </motion.section>
  );
}