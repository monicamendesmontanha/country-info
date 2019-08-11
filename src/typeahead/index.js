const listOfCountryNames = countries => countries.map(country => country.name);

// remove countries from the search history that doesn't match with the search
const getSearchHistoryWithMatchingResultsOnly = (
  typeaheadResponse,
  searchHistory
) => {
  const typeaheadResponseNames = listOfCountryNames(typeaheadResponse);

  const searchHistoryWithMatchingResultsOnly = searchHistory.filter(country => {
    return typeaheadResponseNames.includes(country.name);
  });

  return searchHistoryWithMatchingResultsOnly;
};

// eliminate duplicates from the search history
const getCountriesThatAreNotInSearchHistory = (
  typeaheadResponse,
  searchHistoryWithMatchingResultsOnly
) => {
  const searchHistoryNames = listOfCountryNames(
    searchHistoryWithMatchingResultsOnly
  );

  const countriesThatAreNotInSearchHistory = typeaheadResponse.filter(
    country => {
      return !searchHistoryNames.includes(country.name);
    }
  );

  return countriesThatAreNotInSearchHistory;
};

export {
  getSearchHistoryWithMatchingResultsOnly,
  getCountriesThatAreNotInSearchHistory
};
