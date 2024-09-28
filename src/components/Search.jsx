import LandingPageFilter from "./LandingPageFilter"
import SearchBar from "./SearchBar"


const Search = ({ onSearch, sources, selectedSources, setSelectedSources}) => {
  return (
    <div className="flex ">
        <SearchBar onSearch={onSearch}/>
        <LandingPageFilter sources={sources} selectedSourcesr={selectedSources} setSelectedSources={setSelectedSources}/>
    </div>
  )
}

export default Search