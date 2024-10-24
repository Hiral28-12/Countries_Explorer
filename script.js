let countriesContainer = document.querySelector(".countries-container");
const searchInput = document.querySelector("#search");
const regionFilter = document.querySelector("#regionFilter");
const themeChanger = document.querySelector(".theme-changer");
const body = document.body; 

let Allcountry;

fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
        Allcountry = data;
        rendercountries(data);
    });

function rendercountries(data) {
    countriesContainer.innerHTML = ""; 
    data.forEach((ele) => {
        let countryCard = document.createElement("a");
        countryCard.classList.add("country-card");
        let cardHTML = ` 
        <div class="card-img">
            <img src=${ele.flags.svg}  alt="Flag of ${ele.name.common}">
        </div>
        <div class="card-text">
            <h2 class="card-title">${ele.name.common}</h2>
            <p><strong>Population:</strong> ${ele.population.toLocaleString("en-IN")}</p>
            <p><strong>Region:</strong> ${ele.region}</p>
            <p><strong>Capital:</strong> ${ele.capital?.[0] || "N/A"}</p>
        </div>`;
        countryCard.innerHTML = cardHTML;
        countriesContainer.appendChild(countryCard);
    });
}

searchInput.addEventListener("input", (e) => {
    let searchValue = e.target.value.toLowerCase();
    let filteredCountries = Allcountry.filter((country) =>
        country.name.common.toLowerCase().includes(searchValue)
    );
    rendercountries(filteredCountries);
});

regionFilter.addEventListener("change", (e) => {
    let selectedRegion = e.target.value;

    if (selectedRegion === "") {
        rendercountries(Allcountry); 
    } else {
        let filteredCountries = Allcountry.filter((country) => 
            country.region.toLowerCase() === selectedRegion.toLowerCase()
        );
        rendercountries(filteredCountries);
    }
});


themeChanger.addEventListener("click", () => {
    body.classList.toggle("dark-mode"); 

    if (body.classList.contains("dark-mode")) {
        themeChanger.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
    } else {
        themeChanger.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
    }
});
