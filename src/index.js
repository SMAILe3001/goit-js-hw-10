import './css/styles.css';
import searchCantry from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
        refs.divEl.innerHTML = countryInfo(data);
        refs.ulEl.innerHTML = '';
        return;
      }
      if (data.length > MAXIMUM_NUMBER_OF_COUNTRIES) {
        clearContent();
        manyMatches();
        return;
      }

      refs.ulEl.innerHTML = countyList(data);
      refs.divEl.innerHTML = '';
    })
    .catch(onError);
}

function onError() {
  Notify.failure(`Oops, there is no country with that name`);
  clearContent();
}

function manyMatches() {
  Notify.info(`Too many matches found. Please enter a more specific name.`);
}

function clearContent() {
  refs.ulEl.innerHTML = '';
  refs.divEl.innerHTML = '';
}

function countyList(countyList) {
  return countyList
    .map(
      ({ flags: { svg }, flags: { alt }, name: { common } }) => `
				<li class="country-item">			
						<img
            width = 50
						class="country-imager"
						src="${svg}"
						alt=""${alt}"
						/>
            <h2>${common}</h2>				
				</li>
        	`
    )
    .join('');
}

function countryInfo(countryInfo) {
  return countryInfo
    .map(
      ({
        flags: { svg },
        flags: { alt },
        name: { common },
        capital,
        population,
        languages,
      }) => `
      <div>
					<img
            width = 50
						class="country-imager"
						src="${svg}"
						alt="${alt}"
						/>
            <h2>${common}</h2>	
            </div>	
            <ul>
            <li><h3>Capital: <span>${capital}</span></h3></li>		<span></span>
            <li><h3>Population: <span>${population}</span></h3></li>	
            <li><h3>Languages: <span>${Object.values(
              languages
            )}</span></h3></li>
            </ul>
        	`
    )
    .join('');
}
