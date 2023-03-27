const FILTERS = '?fields=name,flags,capital,population,languages';
const BASE_URL = `https://restcountries.com/v3.1/name/`;

export default function searchCantry(serchText) {
  return fetch(`${BASE_URL}${serchText}${FILTERS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}
