import React from "react";
import "./App.css";
import CountryInformation from "./components/CountryInformation";
import SearchBox from "./components/SearchBox";
import {
  getSearchHistoryWithMatchingResultsOnly,
  getCountriesThatAreNotInSearchHistory
} from "./typeahead";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: undefined,
      countryVisible: false,
      searchHistory: [],
      countries: []
    };
  }

  handleSearch = event => {
    event.preventDefault();
    this.setState({ countryVisible: true });
  };

  // Autosuggest will call this function every time needed to update suggestions.
  onSuggestionsFetchRequested = ({ value }) => {
    const self = this;
    const searchHistory = this.state.searchHistory;

    if (value.length < 3) {
      return;
    }

    fetch(`https://restcountries.eu/rest/v2/name/${value}`)
      .then(response => response.json())
      .then(typeaheadResponse => {
        if (typeaheadResponse.status && typeaheadResponse.status === 404) {
          self.setState({ countries: [] });
        } else {
          const searchHistoryWithMatchingResultsOnly = getSearchHistoryWithMatchingResultsOnly(
            typeaheadResponse,
            searchHistory
          );

          const countriesThatAreNotInSearchHistory = getCountriesThatAreNotInSearchHistory(
            typeaheadResponse,
            searchHistoryWithMatchingResultsOnly
          );

          // combine search history with the top10
          const top10 = searchHistoryWithMatchingResultsOnly
            .concat(countriesThatAreNotInSearchHistory)
            .slice(0, 9);

          // set the state with the search result
          self.setState({ countries: top10 });
        }
      });
  };

  // Will be called every time suggestion is selected via mouse or keyboard.
  onSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      selectedCountry: suggestion
    });

    const searchHistory = this.state.searchHistory;
    const searchHistoryNames = searchHistory.map(country => country.name);

    // check if suggestion is already included on the search history
    if (!searchHistoryNames.includes(suggestion.name)) {
      // add suggestion to the end of the search history
      const searchHistoryWithNewSuggestion = searchHistory.concat(suggestion);

      this.setState({
        searchHistory: searchHistoryWithNewSuggestion.reverse()
      });
    }
  };

  // Autosuggest will call this function every time needed to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({ countries: [] });
  };

  render() {
    return (
      <div>
        <header className="header">
          <h1>Country Information</h1>
        </header>
        <SearchBox
          countries={this.state.countries}
          handleSearch={this.handleSearch}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
        />
        {this.state.selectedCountry && this.state.countryVisible ? (
          <CountryInformation country={this.state.selectedCountry} />
        ) : null}
      </div>
    );
  }
}

export default App;
