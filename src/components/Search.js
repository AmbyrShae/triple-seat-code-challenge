import '../stylesheets/Search.scss';

const Search = ({ searchTerm, onSearch }) => {

  return (
    <header className="search">
      <div className="container">
        <input
          className="input"
          type="text"
          placeholder="Search for stocks"
        />
      </div>
    </header>
  );
};

export default Search;
