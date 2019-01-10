const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(element){
  this.element = element;
}

 // waiting for countries data to be loaded
SelectView.prototype.bindEvents = function(){
  PubSub.subscribe('Countries:countries-loaded', (event) => {
    const allCountries = event.detail; //get the countries from the event
    // console.log('SelectView:SUBSCRIBE - all countries /all details', event.detail);
    this.populate(allCountries);
  });
  this.element.addEventListener('change', (event) => { // changes the selected country from dropdown
    // console.log('Return index of country', event.target.value);
    const selectedIndex = event.target.value;
    // console.log('SelectView:PUBLISH eventlistener (change drop down) - country index', selectedIndex);
    PubSub.publish('SelectView:country-index-selected', selectedIndex);
  });
}

SelectView.prototype.populate = function(countries){ //function takes in all the countries
  countries.forEach((country, index) => { // for every country, create an option with that name and index
    // console.log('Test get all the country names', country.name);
    const option = document.createElement('option'); //create an option
    option.value = index; // set the option value to be the index, so we can use the index to get the data out
    option.textContent = country.name; // access the name of a single country
    this.element.appendChild(option); // once selected (go above to EventListener line 14)
  });

};

module.exports = SelectView;
