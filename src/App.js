import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      searching: false,
      countryNames: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(event) {
    const countryName = event.target.value;
    this.setState({ value: countryName });

    if (countryName.length >= 3) {
      const self = this;

      fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(response => response.json())
        .then(countries => {
          const countryNames = countries.map(country => country.name);
          self.setState({ countryNames });
        });
    }
  }

  searchingCountry(value) {
    return new Promise(resolve => {
      let value = this.state.value;

      setTimeout(() => {
        return resolve(value);
      }, Math.random() * 1000 + 500);
    });
  }

  async handleSearch(event) {
    this.setState({ searching: true });
    event.preventDefault();
    const response = await this.searchingCountry(this.state.value);
    this.setState({ response });
    this.setState({ submitting: false, result: this.state.value });
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
            value={this.state.value}
            onChange={this.handleInputChange}
          />
          <button
            type="submit"
            className="button-search-box"
            disabled={this.state.submitting}
          >
            {this.state.submitting ? "Loading" : "Search"}
          </button>
        </form>

        <div>{this.state.countryNames}</div>
      </div>
    );
  }
}

export default App;
