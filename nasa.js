// NASA API key IpEsZxZCFRfdnid2KwftbKCDTtaFhjKtadTk0HzD

const todayDate = new Date();
const currentDate =
    todayDate.getFullYear() +
    "-" +
    ("0" + (todayDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + todayDate.getDate()).slice(-2);

// har varit "tvungen" att ha datum i sådant format för att kunna söka och jämföra i rovers manifest


/* Detta är fetch funktion som tar emot två parametrar rover name och datum och hämtar bilderna från NASA api */
async function getRoverImg(rover, date) {
    let nasaApi = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=IpEsZxZCFRfdnid2KwftbKCDTtaFhjKtadTk0HzD`;

    try {
        const response = await fetch(nasaApi);
        console.log(response);

        if (!response.ok)
            throw new Error(
                `Something went wrong with fetching ${rover} photos`
            );

        const responseJsoned = await response.json();
        /* Fetchar data och omvälar till JSON*/

        //mappar bilder från json till en array som jag ska sedan använda
        const images = responseJsoned.photos.map((photo) => photo.img_src);

        const cycleImgBtn = document.querySelector(".cycle-img-btn");
        cycleImgBtn.classList.remove("hidden");

        if (images.length < 2) {
            cycleImgBtn.disabled = true;
            cycleImgBtn.textContent = `No more images`;
        } else {
            cycleImgBtn.disabled = false;
            cycleImgBtn.textContent = `Cycle images`;
        }

        //liten knapp jag skaffat som låter användaren cycla igenom bilder (om bilderna finns)

        const imgContainer = document.querySelector(".camera-feed");
        let i = 0;
        imgContainer.src = images[0];

        cycleImgBtn.addEventListener("click", () => {
            imgContainer.src = images[++i % images.length];
        });
    } catch (error) {
        alert(error);
        console.log(error);
    }
}
/* funktion som hämtar sista tillgängliga datum från nasa API- manifest, eftersom jag märkte att ingen rover skickar bilderna längre, ville inte visa bara error eller tomt rutan hela tiden :P, sen kan
man expandera i framtiden och göra så att user kan välja datum själv */
async function getMaxDate(rover) {
    try {
        const manifest = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}/?api_key=IpEsZxZCFRfdnid2KwftbKCDTtaFhjKtadTk0HzD`;

        const response = await fetch(manifest);
        if (!response.ok)
            throw new Error(`Something went wrong with fetching ${rover} date`);
        const responseJsoned = await response.json();
        console.log(responseJsoned);
        return responseJsoned.photo_manifest.max_date;
    } catch (error) {
        alert(error);
        console.log(error);
    }
}

/* detta är main funktion som tar emot rover namn och använder data från manifest samt visar meddelande om vilken datum som vissas om det inte finns bilderna från idag */
async function main(rover) {
    const maxDate = await getMaxDate(rover);
    await getRoverImg(rover, maxDate);
    if (currentDate !== maxDate)
        document.querySelector(
            ".msg"
        ).textContent = `No available images from today, showing last available pictures from ${maxDate}. Use the button below to cycle through images`;
}

/*det finns olika sätt att lösa problemet, men jag bestämt att göra så här, när man trycker på knappen, js tar text content (innerhtml) och använder den som string
i funktionen, sen blir det lätt att lägga till en rover i framtiden, samt lite mer clean än att välja varje knapp och "hard coda" varje rover */
const selectRoverBtns = document.querySelectorAll(".select-rover-btn");

selectRoverBtns.forEach((selectRoverBtn) => {
    selectRoverBtn.addEventListener("click", () => {
        const roverName = selectRoverBtn.textContent;
        main(roverName);
        document.querySelector("#images-from-rovers").scrollIntoView({behavior: 'smooth'});
    });
});
