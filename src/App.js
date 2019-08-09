import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: "",
      countryNames: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(event) {
    const selectedCountry = event.target.value;
    this.setState({ selectedCountry: selectedCountry });

    if (selectedCountry.length >= 3) {
      const self = this;

      fetch(`https://restcountries.eu/rest/v2/name/${selectedCountry}`)
        .then(response => response.json())
        .then(countries => {
          const countryNames = countries.map(country => country.name);
          self.setState({ countryNames });
        });
    }
  }

  async handleSearch(event) {
    event.preventDefault();
    this.setState({ result: this.state.selectedCountry });
  }

  render() {
    return (
      <div>
        <header className="header">
          <h1>Country Information</h1>
        </header>
        <form className="search-box" onSubmit={this.handleSearch}>
          <label className="label-search-box">Country name:</label>
          <input
            autoFocus
            type="text"
            className="input-search-box"
            name="countryName"
            placeholder="Australia"
            value={this.state.selectedCountry}
            onChange={this.handleInputChange}
          />
          <button
            type="submit"
            className="button-search-box"
          >Search
          </button>
        </form>

        <div>{this.state.countryNames}</div>
      </div>
    );
  }
}

export default App;
