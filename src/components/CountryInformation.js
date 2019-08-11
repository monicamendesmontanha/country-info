import React from "react";

const CountryInformation = ({ country }) => {
  return (
    <div className="country-info">
      <div className="country-info-flag">
        <div>
          <img src={country.flag} alt="" />
        </div>
      </div>
      <div className="country-info-details">
        <div>
          <span className="country-info-details-title">Country Name:</span>
          {country.name}
        </div>
        <div>
          <span className="country-info-details-title">Currency Name: </span>{" "}
          {country.currencies.map(currency => (
            <span>{currency.name}</span>
          ))}
        </div>
        <div>
          <span className="country-info-details-title">
            Latitude / Longitude:
          </span>{" "}
          {country.latlng}
        </div>
        <div>
          <span className="country-info-details-title">Land Area:</span>{" "}
          {country.area} sq. km
        </div>
      </div>
    </div>
  );
};

export default CountryInformation;