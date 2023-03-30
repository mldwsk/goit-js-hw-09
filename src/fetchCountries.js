async function fetchCountries(name) {
    const baseUrl = 'https://restcountries.com/v3.1/name';
    let info = [];
    await fetch(
      `${baseUrl}/${name.trim()}?fields=name,capital,population,flags,languages`
    )
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          if (!info.includes(data[i])) {
            info.push(data[i]);
          }
        }
      })
      .catch(error => console.log(error));
    return info;
  }

  export {fetchCountries};