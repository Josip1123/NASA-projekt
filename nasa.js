// NASA API key IpEsZxZCFRfdnid2KwftbKCDTtaFhjKtadTk0HzD

const apod =
    "https://api.nasa.gov/planetary/apod?api_key=IpEsZxZCFRfdnid2KwftbKCDTtaFhjKtadTk0HzD";

/*  
    valt att använda async await eftersom jag tycker att det är lättare att läsa och fatta vad som händer
    en smydigare sätt att skriva kod 
*/

async function fetchAstroImageOfTheDay() {
    try {
        // fetching image of the day from NASA API
        const response = await fetch(apod);
        if (!response.ok) {
            throw new Error(`Something went wrong...`);
        }
        const responseJsoned = await response.json(); //convert response to JSON format
        const imageOfTheDay = responseJsoned.url; //väljer bara url prop från JSON file
        // lägger nytt url i DOM - hero bg img
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
