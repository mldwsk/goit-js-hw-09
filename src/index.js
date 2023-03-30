var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchCountries} from "./fetchCountries.js";

Notify.init({
  width: '300px',
  position: 'center-top',
  closeButton: false,
  });

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const inputArea = document.getElementById('search-box');
let infoOnCountries = [];

inputArea.addEventListener('input', debounce(processRequest, 300)); 

async function processRequest () {
  try {
    let input = inputArea.value.trim();
    infoOnCountries = [];
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    if (input !== '') {
      const countriesList = await fetchCountries(input);
      rendercountryListItems(countriesList);
    } else {
      clearDisplay();
    }
  } catch (error) {
    console.log(error.message);
  }
}

function rendercountryListItems(countries) {
  let markup = '';
  countryInfo.innerHTML = '';
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    markup = countries
      .map(
        countries => `<li class="item">
        <img src="${countries.flags.svg}" width="40" height="40"> ${countries.name.official}
      </li>`
      )
      .join('');
    countryList.innerHTML = markup;
  } else if (countries.length === 1) {
    countryList.innerHTML = '';
    markup = countries
      .map(
        countries =>
          `<img src="${countries.flags.svg}" width="40" height="40">
      <h1>${countries.name.official}</h1>
      <h2>Capital: ${countries.capital}</h2>
      <h2>Population: ${countries.population}</h2>
      <h2>Languages: ${Object.values(countries.languages)}</h2>`
      )
      .join('');
    countryInfo.innerHTML = markup;
  } else {
    Notify.failure('Oops, there is no country with that name.');
  }
}

function clearDisplay() {
  let markup = '';
  countryList.innerHTML = markup;
}