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
      suggestions: []
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

    if (value.trim().length < 3) {
      return;
    }

    fetch(`https://restcountries.eu/rest/v2/name/${value}`)
      .then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.status && apiResponse.status === 404) {
          self.setState({ suggestions: [] });
        } else {
          // filter countries from the search history that matches with the typeahead response
          const filteredMatchingCountries = searchHistory.filter(country => {
            return apiResponse.some(item => item.name === country.name);
          });

          // filter countries from the typeahead response doesn't match with the search history (eliminate duplicates)
          const countryListWithoutDuplicates = apiResponse.filter(country => {
            return !filteredMatchingCountries.some(
              item => item.name === country.name
            );
          });

          // get the top 10 results from the country list
          const top10 = countryListWithoutDuplicates.slice(0, 10);

          const searchResult = filteredMatchingCountries.reverse().concat(top10);

          // set the state with the search result
          self.setState({ suggestions: searchResult });
        }
      });
  };

  // Will be called every time suggestion is selected via mouse or keyboard.
  onSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      selectedCountry: suggestion,
      countryVisible: true
    });

    const searchHistory = this.state.searchHistory;

    // check if suggestion is already included on the search history
    if (!searchHistory.some(item => item.name === suggestion.name)) {
      // add identification for the suggestion history
      suggestion["history"] = true;

      // add suggestion to the end of the search history
      const searchHistoryWithNewSuggestion = searchHistory.concat(suggestion);

      this.addSearchHistoryToLocalStorage(searchHistoryWithNewSuggestion);

      this.setState({
        searchHistory: searchHistoryWithNewSuggestion
      });
    }
  };

  // Autosuggest will call this function every time needed to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  addSearchHistoryToLocalStorage = searchHistory => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  };

  getSearchHistoryFromLocalStorage = () => {
    return localStorage.getItem("searchHistory")
      ? JSON.parse(localStorage.getItem("searchHistory"))
      : [];
  };

  loadSearchHistory = () => {
    if (this.state.suggestions.length === 0) {
      const searchHistory = this.getSearchHistoryFromLocalStorage();
      this.setState({ suggestions: searchHistory });
    }
  };

  componentDidMount() {
    const searchHistory = this.getSearchHistoryFromLocalStorage();
    this.setState({ searchHistory });
  }

  render() {
    return (
      <div>
        <header className="header">
          <h1>Country Information</h1>
        </header>
        <SearchBox
          onClick={this.loadSearchHistory}
          suggestions={this.state.suggestions}
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
