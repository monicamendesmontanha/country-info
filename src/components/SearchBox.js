import React from "react";
import Autosuggest from "react-autosuggest";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countryName: "",
      countries: []
    };
  }

  // called every time the input value changes
  handleInputChange = (event, { newValue }) => {
    this.setState({
      countryName: newValue
    });
  };

  // Autosuggest will call this function every time needed to update suggestions.
  onSuggestionsFetchRequested = ({ value }) => {
    const self = this;

    if (value.length < 3) {
      return;
    }

    fetch(`https://restcountries.eu/rest/v2/name/${value}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.status && jsonResponse.status === 404) {
          self.setState({ countries: [] });
        } else {
          const top10 = jsonResponse.slice(0, 9);
          self.setState({ countries: top10 });
        }
      });
  };

  // Autosuggest will call this function every time needed to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({ countries: [] });
  };

  render() {
    const { handleSearch, onSuggestionSelected } = this.props;

    return (
      <form className="search-box" onSubmit={handleSearch}>
        <label className="label-search-box">Country name:</label>
        <Autosuggest
          className="input-search-box"
          suggestions={this.state.countries}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
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
