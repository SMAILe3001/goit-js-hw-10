import './css/styles.css';
import searchCantry from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import listCountrie from './templates/list-countries.hbs';
import infoCountrie from './templates/info-countries.hbs';

const DEBOUNCE_DELAY = 300;
const MAXIMUM_NUMBER_OF_COUNTRIES = 10;

const refs = {
  inputEl: document.querySelector('#search-box'),
  ulEl: document.querySelector('.country-list'),
  divEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(searchCantrys, DEBOUNCE_DELAY));

function searchCantrys(e) {
  let serchText = e.target.value.trim();
  if (!serchText) {
    return;
  }
  searchCantry(serchText)
    .then(data => {
      if (data.length === 1) {
        refs.divEl.innerHTML = infoCountrie(data);
        refs.ulEl.innerHTML = '';
        console.log(data);
        return;
      }
      if (data.length > MAXIMUM_NUMBER_OF_COUNTRIES) {
        manyMatches();
        return;
      }

      refs.divEl.innerHTML = '';
      refs.ulEl.innerHTML = listCountrie(data);
    })
    .catch(onError);
}

function onError() {
  Notify.failure(`Oops, there is no country with that name`);
  clearContent();
}

function manyMatches() {
  Notify.info(`Too many matches found. Please enter a more specific name.`);
  clearContent();
}

function clearContent() {
  refs.ulEl.innerHTML = '';
  refs.divEl.innerHTML = '';
}
