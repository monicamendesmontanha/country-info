import React from "react";
import "./App.css";
import CountryInformation from "./components/CountryInformation";
import SearchBox from "./components/SearchBox";

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

    if (value.length < 3) {
      return;
    }

    fetch(`https://restcountries.eu/rest/v2/name/${value}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.status && jsonResponse.status === 404) {
          self.setState({ countries: [] });
        } else {
          // get top 10
          const top10 = jsonResponse.slice(0, 9);

          // get search history from the state
          const searchHistory = this.state.searchHistory;

          // type "can"
          // history: []
          // top10: ["Canada", "Central African Republic"]
          // select: "Canada"
          // history: ["Canada"]

          // type "bra"
          // top10: ["Brazil", "Gibraltar"]
          // history: ["Canada"] - No show!
          // select: "Brazil"
          // history: ["Canada", "Brazil"]


         const top10Names = top10.map(country => country.name);

         // remove countries from the search history that doesn't match with the search
         const searchHistoryWithMatchingResultsOnly = searchHistory.filter(country => {
            return top10Names.includes(country.name);
         });

          // eliminate duplicates from the search history
          const searchHistoryNames = searchHistoryWithMatchingResultsOnly.map(item => item.name);
          const countriesThatAreNotInSearchHistory = top10.filter(country => {
            return !searchHistoryNames.includes(country.name);
          });

          // combine search history with the top10
          const searchResult = searchHistoryWithMatchingResultsOnly.concat(
            countriesThatAreNotInSearchHistory
          );

          // set the state with the search result
          self.setState({ countries: searchResult });
        }
      });
  };

  // Will be called every time suggestion is selected via mouse or keyboard.
  onSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      selectedCountry: suggestion,
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
