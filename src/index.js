import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const MAXIMUM_NUMBER_OF_COUNTRIES = 10;

const refs = {
  inputEl: document.querySelector('#search-box'),
};

refs.inputEl.addEventListener('input', debounce(searchCantry, DEBOUNCE_DELAY));

function searchCantry(e) {
  const serchText = e.target.value;

  fetch(`https://restcountries.com/v3.1/name/${serchText}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      console.log();

      return response.json();
    })
    .then(data => {
      if (data.length > MAXIMUM_NUMBER_OF_COUNTRIES) {
        manyMatches();
        return;
      }
      console.log(data);
    })
    .catch(onError);
}

function onError() {
  Notify.failure(`Oops, there is no country with that name`);
}

function manyMatches() {
  Notify.info(`Too many matches found. Please enter a more specific name.`);
}
