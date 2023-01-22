export function createCountryInfoCardMarkup(capital, population, languages) {
  return `
<ul class='country-info__box'>
  <li class='country-info__item'>
    <span class='country-info__category'>Capital:</span><span class='country-info__value'>${capital}</span>
  </li>
  <li class='country-info__item'>
    <span class='country-info__category'>Population:</span><span class='country-info__value'>${population}</span>
  </li>
  <li class='country-info__item'>
    <span class='country-info__category'>Languages:</span><span class='country-info__value'>${languages}</span>
  </li>
</ul>`;
}
