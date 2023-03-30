const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
const inputArea = document.getElementById("search-box");
let infoOnCountries = [];

inputArea.addEventListener("input", async () => {
  try {
    infoOnCountries = [];
    const countriesList = await fetchCountries(inputArea.value);
    rendercountryListItems(countriesList);
  } catch (error) {
    console.log(error.message);
  }
});

async function fetchCountries(userInput) {
  const baseUrl = "https://restcountries.com/v3.1/name";
  let countryInfoObj = await fetch(`${baseUrl}/${userInput.trim()}?fields=name,capital,population,flags,languages`) 
  .then(response => response.json())
  .then(data => {
    for(let i = 0; i<data.length; i++) {
      if(!infoOnCountries.includes(data[i])) {
        infoOnCountries.push(data[i]);
      }
    };
  })
  .catch(error => console.log(error));
  
  return infoOnCountries;
}

function rendercountryListItems(countries) {
  if(countries.length>10) {
    const markup = `<li class="item"><p>Too many countries. Please, be more specific.</p></li>`
    countryList.innerHTML = markup;
  }
  else if(countries.length>=2&&countries.length<=10) {
    const markup = countries
    .map(
      (countries) => `<li class="item">
        <img src="${countries.flags.svg}" width="40" height="40"> ${countries.name.official}
      </li>`
    )
    .join("");
    countryList.innerHTML = markup;
  } else if(countries.length === 1) {
    const markup = countries
    .map(
      (countries) => `<li class="item">
        <img src="${countries.flags.svg}" width="40" height="40"> ${countries.name.official}
      </li>`
    )
    .join("");
    countryList.innerHTML = markup;
  } else {
    const markup = `<li class="item"><p>Ooops. Looks like there are no countries with that name.</p></li>`
    countryList.innerHTML = markup;
  }
}