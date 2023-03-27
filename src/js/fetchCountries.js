'use strict';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = `https://restcountries.com/v3.1/name/`;
const MAXIMUM_NUMBER_OF_COUNTRIES = 10;

export default function searchCantry(serchText) {
  fetch(`${BASE_URL}${serchText}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

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
