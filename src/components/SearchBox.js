import React from "react";
import Autosuggest from "react-autosuggest";

const SearchBox = ({
  handleSearch,
  countries,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  onSuggestionSelected,
  countryName,
  handleInputChange
}) => {
  return (
    <form className="search-box" onSubmit={handleSearch}>
      <label className="label-search-box">Country name:</label>
      <Autosuggest
        className="input-search-box"
        suggestions={countries}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={suggestion => suggestion.name}
        renderSuggestion={country => (
          <div>
            {country.name} - {country.alpha3Code}
          </div>
        )}
        inputProps={{
          placeholder: "Type a country name",
          value: countryName,
          onChange: handleInputChange
        }}
      />
      <button type="submit" className="button-search-box">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
