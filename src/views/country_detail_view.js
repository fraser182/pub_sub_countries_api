const PubSub = require('../helpers/pub_sub.js');

const CountryDetailView =  function(container){
  this.container = container;
};

CountryDetailView.prototype.bindEvents = function(){
  PubSub.subscribe('Countries:country-found', (event) => {
    const country = event.detail;
    this.render(country);
    // console.log('Country Detail View: SUBSCRIBE - one country info', event.detail);
  });
}

// name, region, flag, languages
CountryDetailView.prototype.render = function(country){
  this.container.innerHTML = '';

  // Country Name
  // console.log('Country Name:', country.name);
  const header = document.createElement('h3');
  header.textContent = `Country name: ${country.name}`;

  // Country Region
  // console.log('Region:', country.region);
  const subheader = document.createElement('p');
  subheader.textContent = `Region: ${country.region}`;

  //Country Flag
  // console.log('Flag Img:', country.flag);
  const img = document.createElement('img');
  img.classList.add('country-flag-image');
  img.src = country.flag;

  // Country languages
  // console.log('Country Languages:', country.languages.name);
  // console.log('Country Languages:', country.languages[0].name);
  // console.log('Country Languages:', country.languages);

  const countryLanguages = document.createElement('ul');
  country.languages.forEach((language) => {
    const listItem = document.createElement('li')
    listItem.textContent = language.name; // put in the text into the list item
    countryLanguages.appendChild(listItem); // append each item to the list
  });


  this.container.appendChild(header);
  this.container.appendChild(subheader);
  this.container.appendChild(img);
  this.container.appendChild(countryLanguages);
}

module.exports = CountryDetailView;
