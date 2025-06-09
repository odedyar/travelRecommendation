document.querySelector(".search-btn").addEventListener("click", function(event) {
    event.preventDefault();
    const destination = document.getElementById("destination").value.trim();

    if (destination) {
        fetch(`travel_recommendation_api.json`)
            .then(response => response.json())
            .then(data => {
                const resultsDiv = document.querySelector(".results");
                resultsDiv.innerHTML = ""; // Clear previous results

                // Search in countries
                const countryMatches = data.countries.filter(country =>
                    country.name.toLowerCase().includes(destination.toLowerCase())
                );

                // Search in temples
                const templeMatches = data.temples.filter(temple =>
                    temple.name.toLowerCase().includes(destination.toLowerCase())
                );

                // Search in beaches
                const beachMatches = data.beaches.filter(beach =>
                    beach.name.toLowerCase().includes(destination.toLowerCase())
                );

                // Collect all results
                let hasResults = false;

                // Show country matches
                if (countryMatches.length > 0) {
                    hasResults = true;
                    countryMatches.forEach(country => {
                        const recDiv = document.createElement("div");
                        recDiv.className = "recommendation";
                        //recDiv.innerHTML = `<h3>${country.name}</h3>`;
                        // Optionally show cities
                        if (country.cities && country.cities.length > 0) {
                            recDiv.innerHTML +=  country.cities.map(city =>
                                `<div><img src="images/${city.imageUrl}" alt="${city.name}" class="city-image` + `"><br /><strong>${city.name}</strong><br /> ${city.description}<br /><button>visit</button></div>`
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
                        recDiv.innerHTML = `<h3>${temple.name}</h3><p>${temple.description}</p>`;
                        resultsDiv.appendChild(recDiv);
                    });
                }

                // Show beach matches
                if (beachMatches.length > 0) {
                    hasResults = true;
                    beachMatches.forEach(beach => {
                        const recDiv = document.createElement("div");
                        recDiv.className = "recommendation";
                        recDiv.innerHTML = `<h3>${beach.name}</h3><p>${beach.description}</p>`;
                        resultsDiv.appendChild(recDiv);
                    });
                }

                if (!hasResults) {
                    resultsDiv.innerHTML = "<p>No recommendations found for this destination.</p>";
                }
            });
    } else {
        alert("Please enter a search term.");
    }
});

// Optional: clear results when clicking the clear button
document.querySelector(".clear-btn").addEventListener("click", function() {
    document.getElementById("destination").value = "";
    document.querySelector(".results").innerHTML = "";
});
