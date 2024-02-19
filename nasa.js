// NASA API key IpEsZxZCFRfdnid2KwftbKCDTtaFhjKtadTk0HzD

const todayDate = new Date();

const currentDate =
    todayDate.getFullYear() +
    "-" +
    ("0" + (todayDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + todayDate.getDate()).slice(-2);

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
        const images = responseJsoned.photos.map((photo) => photo.img_src);
        console.log(images);

        const cycleImgBtn = document.querySelector(".cycle-img-btn");
        cycleImgBtn.classList.remove("hidden");

        if (images.length < 2) {
            cycleImgBtn.disabled = true;
            cycleImgBtn.textContent = `No more images`;
        } else {
            cycleImgBtn.disabled = false;
            cycleImgBtn.textContent = `Cycle images`;
        }

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

async function main(rover) {
    const maxDate = await getMaxDate(rover);
    console.log(maxDate);
    await getRoverImg(rover, maxDate);
    if (currentDate !== maxDate)
        document.querySelector(
            ".error-msg"
        ).textContent = `No available pictures from today, showing last available pictures from ${maxDate}`;
}

const selectRoverBtns = document.querySelectorAll(".select-rover-btn");

selectRoverBtns.forEach((selectRoverBtn) => {
    selectRoverBtn.addEventListener("click", () => {
        const roverName = selectRoverBtn.textContent;
        main(roverName);
    });
});
