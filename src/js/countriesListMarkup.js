export function createCountriesListMarkup(countries) {
  return countries.map(createCountryElMarkup).join('');
}

function createCountryElMarkup(countryInfo) {
  const { flags, name } = countryInfo;
  return `
  <li class="country-item">
        <img src="${flags.svg}" alt="Flag of country" class="country-flag" width="50"/>
        <p class="country-name">${name.official}</p>
  </li>`;
}
