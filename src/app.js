const Countries = require('./models/countries.js');
const SelectView = require('./views/select_view.js');
const CountryDetailView = require('./views/country_detail_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

// subscribes to Countries
const container = document.querySelector('#country');
const countryDetailView = new CountryDetailView(container);
countryDetailView.bindEvents();


// subscribes to Countries
  const selectElement = document.querySelector('#countries');
  const selectView = new SelectView(selectElement);
  selectView.bindEvents();

  // publish first
  const countries = new Countries();
  countries.bindEvents();
  countries.getData();
});
