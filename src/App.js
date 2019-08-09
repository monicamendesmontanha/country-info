import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSearch(event) {
    console.log("Searching for: " + this.state.value);
    event.preventDefault();
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
            type="text"
            className="input-search-box"
            name="countryName"
            placeholder="Australia"
            value={this.state.value}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Search" className="button-search-box" />
        </form>
      </div>
    );
  }
}

export default App;
