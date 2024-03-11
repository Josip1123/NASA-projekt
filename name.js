// SUBMIT THE NAME

// DOM elementer vi ska använda med submit btn
const userNameSubmitBtn = document.querySelector("#btn");
const userInput = document.querySelector("#userName");
const welcomeText = document.querySelector(".welcome");

// funktioner som ska användas längre när, som aktiverar eller deaktiverar knappen
function enableBtn() {
    userNameSubmitBtn.disabled = false;
    userNameSubmitBtn.classList.remove("disabled");
}
function disableBtn() {
    userNameSubmitBtn.disabled = true;
    userNameSubmitBtn.classList.add("disabled");
}

function checkName() {
    // om input text har mer än 3 char då kan man avända submit knappen
    // anars knappen blir disablead
    if (userInput.value.length >= 3) {
        enableBtn();
    } else {
        disableBtn();
    }
}

function getName() {
    const yourName = userInput.value;
    welcomeText.textContent = `Hey ${
        yourName.charAt(0).toUpperCase() + yourName.slice(1).toLowerCase()
    }, \n choose the rover below!`; //tar input value och använder den som velkomst text, capitalizing bara första bokstav
    userInput.value = ""; //rensar fältet efteråt
    disableBtn(); //efter vi raderar input field btn är fortfarande enabled trots tom - då vill jag sätta disabled igen
    document.querySelector(".main-content").classList.remove("hidden"); //välj rover knapparna vissas bara om man skriver in namnet
    document
        .querySelector("#welcome-msg")
        .scrollIntoView({ behavior: "smooth" }); //tyckte det var smidigt att sidan flyttar sig till knapparna som dyker upp
    if (welcomeText.textContent) document.querySelector(".username-submit-container").classList.add("grey-out");
    // jag lekte lite och lagt lite oppacity till "username-submit" section
}

userInput.addEventListener("input", checkName); //funktion kollar vid varje imput om lenghten blev > 3

userNameSubmitBtn.addEventListener("click", getName); // getName funktion blir kallad vid click on submit knapp

//litet funktion on keydown, som aktiverar submit name button om user trycker enter istället
userInput.addEventListener("keydown", (pressEnter) => {
    if (pressEnter.code === "Enter") {
        pressEnter.preventDefault();
        userNameSubmitBtn.click();
        userInput.blur();
    }
});
