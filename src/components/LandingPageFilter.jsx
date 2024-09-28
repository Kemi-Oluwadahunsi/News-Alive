import { motion } from "framer-motion";

export default function LandingPageFilter({
  sources,
  selectedSources,
  setSelectedSources,
}) {
  const handleSourceChange = (source) => {
    setSelectedSources((prevSources) =>
      prevSources.includes(source)
        ? prevSources.filter((s) => s !== source)
        : [...prevSources, source]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <h2 className="text-xl font-bold mb-2">Filter by Source</h2>
      <div className="flex flex-wrap gap-2">
        {sources.map((source) => (
          <motion.button
            key={source}
            onClick={() => handleSourceChange(source)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedSources.includes(source)
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {source}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
