document.querySelector(".search-btn").addEventListener("click", function(event) {
    event.preventDefault();
    const destination = document.getElementById("destination").value.trim();

    if (destination) {
        fetch(`travel_recommendation_api.json`)
            .then(response => response.json())
            .then(data => {
                const resultsDiv = document.querySelector(".results");
                resultsDiv.innerHTML = ""; // Clear previous results

                const lowerDestunation = destination.toLowerCase();
                let countryMatches = [];
                let templeMatches = []; 
                let beachMatches = [];
                // if countries
                if(lowerDestunation === "countries" || lowerDestunation === "country") {
                    countryMatches = data.countries;
                }

                // if temples
                if(lowerDestunation === "temples" || lowerDestunation === "temple") {
                    templeMatches = data.temples;
                }

                // if beaches
                if(lowerDestunation === "beaches" || lowerDestunation === "beach") {
                    beachMatches = data.beaches;               
                }

                // if having no matches
                if (countryMatches.length === 0 && templeMatches.length === 0 && beachMatches.length === 0) {
                    alert("No recommendations found for this destination.");
                    return;
                }
                let hasResults = false;

                // Helper function to get local time string for a timezone
                function getLocalTime(timezone) {
                    try {
                        return new Intl.DateTimeFormat('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: false,
                            timeZone: timezone
                        }).format(new Date());
                    } catch {
                        return "Unknown";
                    }
                }

                // Show country matches
                if (countryMatches.length > 0) {
                    hasResults = true;
                    countryMatches.forEach(country => {
                        const recDiv = document.createElement("div");
                        recDiv.className = "recommendation";
                        if (country.cities && country.cities.length > 0) {
                            recDiv.innerHTML += country.cities.map(city =>
                                `<div>
                                    <img src="images/${city.imageUrl}" alt="${city.name}" class="city-image"><br />
                                    <strong>${city.name}</strong><br />
                                    ${city.description}<br />
                                    <em>Timezone: ${city.timezone}</em><br />
                                    <strong>Local time: ${getLocalTime(city.timezone)}</strong><br />
                                    <button>visit</button>
                                </div>`
                            ).join("");
                        }
                        resultsDiv.appendChild(recDiv);
                    });
                }

                // Show temple matches
                if (templeMatches.length > 0) {
                    hasResults = true;
                    templeMatches.forEach(temple => {
                        const recDiv = document.createElement("div");
                        recDiv.className = "recommendation";
                        recDiv.innerHTML = `<div>
                            <img src="images/${temple.imageUrl}" alt="${temple.name}" class="city-image"><br />
                            <strong>${temple.name}</strong><br />
                            ${temple.description}<br />
                            <em>Timezone: ${temple.timezone}</em><br />
                            <strong>Local time: ${getLocalTime(temple.timezone)}</strong><br />
                            <button>visit</button>
                        </div>`;
                        resultsDiv.appendChild(recDiv);
                    });
                }

                // Show beach matches
                if (beachMatches.length > 0) {
                    hasResults = true;
                    beachMatches.forEach(beach => {
                        const recDiv = document.createElement("div");
                        recDiv.className = "recommendation";
                        recDiv.innerHTML += `<div>
                            <img src="images/${beach.imageUrl}" alt="${beach.name}" class="city-image"><br />
                            <strong>${beach.name}</strong><br />
                            ${beach.description}<br />
                            <em>Timezone: ${beach.timezone}</em><br />
                            <strong>Local time: ${getLocalTime(beach.timezone)}</strong><br />
                            <button>visit</button>
                        </div>`;
                        resultsDiv.appendChild(recDiv);
                    });
                }

                if (!hasResults) {
                    alert("No recommendations found for this destination.");
                }
            }).catch(error => {
                console.error("Error fetching travel recommendations:", error);
                alert("Error loading recommendations. Please try again later.");
            });
    } else {
        alert("Please enter a search term.");
    }
});

// clear results when clicking the clear button
document.querySelector(".clear-btn").addEventListener("click", function() {
    document.getElementById("destination").value = "";
    document.querySelector(".results").innerHTML = "";
});
