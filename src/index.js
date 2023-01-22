import './css/styles.css';
import { createCountryInfoCardMarkup } from './js/countryInfoCardMarkup';
import { createCountriesListMarkup } from './js/countriesListMarkup';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

Notify.init({
  width: '400px',
  position: 'center-top',
});

const DEBOUNCE_DELAY = 300;

const searchBoxEl = document.querySelector('#search-box');
const countriesContainerEl = document.querySelector('.country-list');
const countryInfoContainer = document.querySelector('.country-info');

searchBoxEl.addEventListener(
  'input',
  debounce(onSearchBoxChange, DEBOUNCE_DELAY)
);

function onSearchBoxChange(e) {
  const query = e.target.value.trim();
  if (!query) {
    if (countriesContainerEl.innerHTML) {
      resetAllCountriesInfo();
    }
    return;
  }

  fetchCountries(query)
    .then(data => {
      const countriesQuantity = data.length;

      if (countriesQuantity > 10) {
        showInfoNotify();

        if (countriesContainerEl.innerHTML) {
          resetAllCountriesInfo();
        }

        return;
      }

      if (countriesQuantity >= 2 && countriesQuantity <= 10) {
        deleteCountryInfo();

        insertCounriesListMarkup(createCountriesListMarkup(data));
        return;
      }
      if (countriesQuantity === 1) {
        const [{ capital, population, languages }] = data;

        const countryLanguages = Object.values(languages).join(', ');

        insertCounriesListMarkup(createCountriesListMarkup(data));
        makeAccentOnCountryName();
        insertCountryInfoCardMarkup(
          createCountryInfoCardMarkup(capital, population, countryLanguages)
        );
        return;
      }
    })
    .catch(err => {
      if (err.message === '404') {
        onErrorCatch();
      }
    });
}

function insertCountryInfoCardMarkup(countryInfoCardMarkup) {
  countryInfoContainer.innerHTML = countryInfoCardMarkup;
}

function insertCounriesListMarkup(countriesListMarkup) {
  countriesContainerEl.innerHTML = countriesListMarkup;
}

function deleteCountriesList() {
  if (countriesContainerEl.innerHTML) {
    countriesContainerEl.innerHTML = '';
  }
}

function deleteCountryInfo() {
  if (countryInfoContainer.innerHTML) {
    countryInfoContainer.innerHTML = '';
  }
}

function resetAllCountriesInfo() {
  deleteCountriesList();
  deleteCountryInfo();
}

function onErrorCatch() {
  if (countriesContainerEl.innerHTML) {
    resetAllCountriesInfo();
  }

  showFailureNotify();
}

function showFailureNotify() {
  return Notify.failure('Oops, there is no country with that name.');
}
function showInfoNotify() {
  return Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function makeAccentOnCountryName() {
  const countryNameEl = countriesContainerEl.querySelector('.country-name');
  countryNameEl.classList.add('country-name--accent');
}
