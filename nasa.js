// NASA API key IpEsZxZCFRfdnid2KwftbKCDTtaFhjKtadTk0HzD

const todayDate = new Date();

const currentDate =
    todayDate.getFullYear() +
    "-" +
    ("0" + (todayDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + todayDate.getDate()).slice(-2);

async function opportunity(date) {
    let opportunityRover = `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=${date}&camera=PANCAM&api_key=IpEsZxZCFRfdnid2KwftbKCDTtaFhjKtadTk0HzD`;

    try {
        let i = 0;
        const response = await fetch(opportunityRover);

        if (!response.ok)
            throw new Error(`Something went wrong with fetching opportunity photos`);

        const responseJsoned = await response.json();
        const images = responseJsoned.photos.map((photo) => photo.img_src);

        const cycleImgBtn = document.querySelector(".previous-img");
        if (images.length < 2) cycleImgBtn.disabled = true;

        const opportunityElement = document.querySelector(
            ".opportunity-camera-feed"
        );
        opportunityElement.src = images[0];
        
        cycleImgBtn.addEventListener("click", () => {
            opportunityElement.src = images[++i % images.length];
        });
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

async function getOpportunityMaxDate() {
    try {
        const manifest =
            "https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity/?api_key=IpEsZxZCFRfdnid2KwftbKCDTtaFhjKtadTk0HzD";

        const response = await fetch(manifest);
        if (!response.ok)
            throw new Error(`Something went wrong with fetching the date`);
        const responseJsoned = await response.json();
        return responseJsoned.photo_manifest.max_date;
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

async function main() {
    const opportunityMaxDate = await getOpportunityMaxDate();
    await opportunity(opportunityMaxDate);
    if (currentDate !== opportunityMaxDate)
        console.log(
            `no available pictures from ${currentDate}, showing last available pictures from ${opportunityMaxDate} 🙃`
        );
}

main();
