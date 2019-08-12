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

  shouldRenderSuggestions = value => {
    return true;
  };

  render() {
    const {
      onClick,
      suggestions,
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
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          getSuggestionValue={suggestion => suggestion.name}
          renderSuggestion={country => (
            <div>
              {country.history ? (
                <div>
                  {country.name} - {country.alpha3Code}{" "}
                  <span className="search-history">(search history)</span>
                </div>
              ) : (
                <div>
                  {country.name} - {country.alpha3Code}
                </div>
              )}
            </div>
          )}
          inputProps={{
            placeholder: "Type a country name",
            value: this.state.countryName,
            onChange: this.handleInputChange,
            onClick: onClick
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
