import React from "react";
import Autosuggest from "react-autosuggest";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: undefined,
      countryName: "",
      countries: [],
      countryVisible: false
    };
  }

  handleSearch = event => {
    event.preventDefault();
    this.setState({ countryVisible: true });
  };

  // called every time the input value changes
  handleInputChange = (event, { newValue }) => {
    this.setState({
      countryName: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    const self = this;

    if (value.length < 3) {
      return;
    }

    fetch(`https://restcountries.eu/rest/v2/name/${value}`)
      .then(response => response.json())
      .then(countries => {
        self.setState({ countries });
      })
      .catch(() => self.setState({ countries: [] }));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({ countries: [] });
  };

  // Will be called every time suggestion is selected via mouse or keyboard.
  onSuggestionSelected = (event, { suggestion }) => {
    this.setState({ selectedCountry: suggestion });
  };

  render() {
    return (
      <div>
        <header className="header">
          <h1>Country Information</h1>
        </header>
        <form
          className="search-box"
          onSubmit={this.handleSearch}
          autoComplete="off"
        >
          <label className="label-search-box">Country name:</label>
          <Autosuggest
            className="input-search-box"
            suggestions={this.state.countries}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
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


        {this.state.selectedCountry && this.state.countryVisible ? (
          <div className="country-info">
            <div><img src={this.state.selectedCountry.flag} alt="" className="country-flag"/></div>
            <div>Country Name: {this.state.selectedCountry.name}</div>
            <div>Currency Name: {this.state.selectedCountry.currencies.map(currency => <span>{currency.name}</span>)}</div>
            <div>Latitude/longitude: {this.state.selectedCountry.latlng}</div>
            <div>Land area: {this.state.selectedCountry.area}</div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
