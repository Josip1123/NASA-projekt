// NASA API key IpEsZxZCFRfdnid2KwftbKCDTtaFhjKtadTk0HzD

const todayDate = new Date();

const currentDate =
    todayDate.getFullYear() +
    "-" +
    ("0" + (todayDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + todayDate.getDate()).slice(-2);

async function getRoverImg(rover, date) {
    let nasaApi = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&camera=PANCAM&api_key=IpEsZxZCFRfdnid2KwftbKCDTtaFhjKtadTk0HzD`;

    try {
        let i = 0;
        const response = await fetch(nasaApi);

        if (!response.ok)
            throw new Error(
                `Something went wrong with fetching ${rover} photos`
            );

        const responseJsoned = await response.json();
        const images = responseJsoned.photos.map((photo) => photo.img_src);

        const cycleImgBtn = document.querySelector(".cycle-img-btn");
        if (images.length < 2) cycleImgBtn.disabled = true;

        const imgContainer = document.querySelector(".opportunity-camera-feed");

        imgContainer.src = images[0];

        cycleImgBtn.addEventListener("click", () => {
            imgContainer.src = images[++i % images.length];
        });
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

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
        console.log(error);
        alert(error);
    }
}

async function main(rover) {
    const maxDate = await getMaxDate(rover);
    console.log(maxDate);
    await getRoverImg(rover, maxDate);
    if (currentDate !== maxDate)
        console.log(
            `no available pictures from ${currentDate}, showing last available pictures from ${maxDate} 🙃`
        );
}

window.onload = main("opportunity");
