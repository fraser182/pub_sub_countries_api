const PubSub = require('../helpers/pub_sub.js');

const Countries = function(){
  this.countries = [];

}

Countries.prototype.bindEvents = function(){
  PubSub.subscribe('SelectView:country-index-selected', (event) => {
    const selectedIndex = event.detail;
    // console.log('Countries: SUBSCRIBE - eventlistener (change drop down) - country index', event.detail);
    const country = this.findCountry(selectedIndex);
    // console.log('Countries: PUBLISH - one country, all details', country);
    PubSub.publish('Countries:country-found', country);
  });
}

Countries.prototype.findCountry = function(index){
  return this.countries[index]

}

Countries.prototype.getData = function(){
  const xhr =  new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    if (xhr.status !== 200){
      return;
    }
    const jsonString = xhr.responseText;
    this.countries = JSON.parse(jsonString)
    // console.log('Countries: INITIAL PUBLISH - - all countries /all details', this.countries);
    PubSub.publish('Countries:countries-loaded', this.countries)
  });
  xhr.open('GET', 'https://restcountries.eu/rest/v2/');
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.send();
}



module.exports = Countries;
