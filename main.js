let gameScore = 0;
let winValue = 2;
let loseValue = -1;

let score = document.getElementById('score');

function loadCity() {
    console.log('beginning function loadCity');
    const URL = 'https://restcountries.eu/rest/v2/regionalbloc/eu';

    let request = new XMLHttpRequest();
    request.open("GET", URL);
    request.send();
    request.onload = function() {
        let data = request.response;
        let dataCountryCity = JSON.parse(data);
        let selectedCountry = '';
        let selectedCapitalMatch = '';
        let selectedCities = [];
        let displayThelistOfCapitals = document.getElementById('listOfCapitals');
        let country = document.getElementById('country');
        let capitals = [];

        function displayFourCapitals() {

            // Shuffle array
            const shuffled = dataCountryCity.sort(() => 0.5 - Math.random());
            // Get sub-array of first n elements after shuffled
            let randomCountryItem = shuffled;
            selectedCountry = randomCountryItem[0].name;
            selectedCities.push(randomCountryItem[0].capital);
            selectedCapitalMatch = randomCountryItem[0].capital;

            // Shuffle array
            let shuffledItem = dataCountryCity.sort(() => 0.5 - Math.random());
            // Get sub-array of first n elements after shuffled
            let randomCitiesItem = shuffledItem.slice(0, 3);

            for (i = 0; i < 3; i++) {
                if (randomCitiesItem[i].capital == selectedCapitalMatch) {
                    randomCitiesItem = shuffledItem.slice(0, 3);
                    selectedCities.push(randomCitiesItem[i].capital);
                } else {
                    selectedCities.push(randomCitiesItem[i].capital);
                }
            }
            displayThelistOfCapitals.innerHTML = "";
            for (let i = 0; i < 4; i++) {
                displayThelistOfCapitals.insertAdjacentHTML('beforeend', "<button id='capital" + i + " class='capital'>" + selectedCities[i] + "</button>");
            }
            country.innerHTML = "The country is: " + selectedCountry;
            capitals = document.getElementsByClassName("capital");
            for (let i = 0; i < selectedCities.length; i++) {
                capitals[i].addEventListener("click", function() {
                    if (selectedCities[i] == selectedCapitalMatch) {

                        gameScore = gameScore + winValue;
                        score.innerHTML = "Score: " + gameScore;
                        loadCity();
                    } else {
                        gameScore = gameScore + loseValue;
                        score.innerHTML = "Score: " + gameScore;
                        loadCity();
                    }
                });
            }
            console.log(selectedCountry);

            console.log(selectedCities);
            selectedCities = [];
        }
        displayFourCapitals();

    }
    score.innerHTML = "Score: " + gameScore;
}