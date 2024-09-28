// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Search } from "lucide-react";

// export default function SearchBar({ onSearch }) {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(searchTerm);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="my-8 max-w-96 mx-auto"
//     >
//       <form onSubmit={handleSubmit} className="flex items-center">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search articles..."
//           className="flex-grow p-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition-colors"
//         >
//           <Search size={24} />
//         </button>
//       </form>
//     </motion.div>
//   );
// }


import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === "") {
      onSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 max-w-96 mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={handleChange}
          className="w-full py-2 px-4 pr-10 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}