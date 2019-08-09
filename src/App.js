import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: "",
      countries: []
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
        .then(countries => { self.setState({ countries });
        })
        .catch(() => self.setState({ countries: [] }))
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
        <form className="search-box" onSubmit={this.handleSearch} autoComplete="off">
          <label className="label-search-box">Country name:</label>
          <input
            autoFocus
            autoComplete="false"
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
        <ul>{this.state.countries.map(country => (<li key={country.name}>{country.name}</li>))}</ul>
      </div>
    );
  }
}

export default App;
