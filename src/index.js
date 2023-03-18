const specifiedCountry = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

specifiedCountry.addEventListener("input", async () => {
try {
  const countries = await fetchCountries(specifiedCountry.value);
  //rendercountryInfoItems(countries);
} catch (error) {
  console.log(error.message);
}
});

//dotąd działa

async function fetchCountries(chosenCountry) {
  const baseUrl = "https://restcountries.com/v3.1/{service}?fields={name},{capital},{population},{flag-svg},{languages}";
  console.log(baseUrl);
  console.log(chosenCountry);
  let response = []; 
  const arrayOfPrimisedData = ["name", "capital", "population", "flag-svg", "languages"];
  for(let i = 0; i<arrayOfPrimisedData; i++) {
    response.push(await fetch(`${baseUrl}/${arrayOfPrimisedData[i]}/${userId}`));
    console.log(arrayOfPrimisedData[i]);
  }
  //return response.json();
  const countriesArray = await Promise.all(arrayOfPrimisedData);
  return countriesArray;
  
}
  /*
async function fetchUsers() {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  const userIds = [1, 2, 3, 4, 5];

  const arrayOfPromises = userIds.map(async (userId) => {
    const response = await fetch(`${baseUrl}/users/${userId}`);
    return response.json();
  });

  const users = await Promise.all(arrayOfPromises);
  return users;
}

  */
 
/*
function rendercountryInfoItems(countries) {
  const markup = countries
    .map(
      (country) => `<li class="item">
        <p><b>Name</b>: ${country.name.official}</p>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Flag</b>: ${country.flag-svg}</p>
        <p><b>Languages</b>: ${country.languages}</p>
      </li>`
    )
    .join("");
    countryInfo.innerHTML = markup;
}*/