import React from "react";
import Autosuggest from "react-autosuggest";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countryName: ""
    };
  }

  // called every time the input value changes
  handleInputChange = (event, { newValue }) => {
    this.setState({
      countryName: newValue
    });
  };

  render() {
    const {
      countries,
      handleSearch,
      onSuggestionsClearRequested,
      onSuggestionsFetchRequested,
      onSuggestionSelected
    } = this.props;

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
            value: this.state.countryName,
            onChange: this.handleInputChange
          }}
        />
        <button type="submit" className="button-search-box">
          Search
        </button>
      </form>
    );
  }
}

export default SearchBox;
