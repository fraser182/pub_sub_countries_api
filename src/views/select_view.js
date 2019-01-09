const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(element){
  this.element = element;
}

 // waiting for countries data to be loaded
SelectView.prototype.bindEvents = function(){
  PubSub.subscribe('Countries:countries-loaded', (event) => {
    // console.log('SelectView:SUBSCRIBE all countries loaded', event.detail);
    const allCountries = event.detail;
    this.populate(allCountries);
  });
  this.element.addEventListener('change', (event) => {
    const selectedIndex = event.target.value;
    // console.log('SelectView: PUBLISH event listener for country index', selectedIndex);
    PubSub.publish('SelectView:country-index-selected', selectedIndex)
  });
}

SelectView.prototype.populate = function(countries){
  countries.forEach((country, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = country.name;
    this.element.appendChild(option);
  });

};

module.exports = SelectView;
