// NASA API key IpEsZxZCFRfdnid2KwftbKCDTtaFhjKtadTk0HzD

const apod =
    "https://api.nasa.gov/planetary/apod?api_key=IpEsZxZCFRfdnid2KwftbKCDTtaFhjKtadTk0HzD";

async function fetchAstroImageOfTheDay() {
    try {
        // fetching image of the day from NASA API
        const response = await fetch(apod);
        if (!response.ok) {
            throw new Error(`Something went wrong...`);
        }
        //convert response to JSON format
        const responseJsoned = await response.json();
        const imageOfTheDay = responseJsoned.url;
        const heroElement = document.querySelector(".hero");
        heroElement.attributeStyleMap.append(
            "background-image",
            `url(${imageOfTheDay})`
        );
    } catch (error) {
        // visa felet i console
        console.log(error);
    }
}

fetchAstroImageOfTheDay();
