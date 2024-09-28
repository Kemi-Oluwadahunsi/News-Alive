import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Filters({ authors, sources, filters, setFilters }) {
  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-2">Filters</h2>
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium mb-1">Authors</label>
          <select
            value={filters.author}
            onChange={(e) => handleFilterChange("author", e.target.value)}
            className="w-full p-2 bg-gray-800 rounded text-white"
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
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
          <label className="block text-sm font-medium mb-1">Published Date</label>
          <DatePicker
            selected={filters.fromDate}
            onChange={(date) => handleFilterChange("fromDate", date)} 
            className="w-full p-2 bg-gray-800 rounded text-white"
            placeholderText="Select published date"
          />
        </div>
        
      </div>
      
    </div>
  );
}