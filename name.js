// SUBMIT THE NAME

// DOM elementer vi ska använda med submit btn
const userNameSubmitBtn = document.querySelector("#btn");
const userInput = document.querySelector("#userName");
const welcomeText = document.querySelector(".welcome");

//funktioner som jag kan använda flera gånger, DRY
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
    welcomeText.textContent = `Welcome ${
        yourName.charAt(0).toUpperCase() + yourName.slice(1).toLowerCase()
    }, \n choose the rover below!`; //tar input value och använder den för velkomst text, capitalizing bara först bokstav
    userInput.value = ""; //rensar fältet efteråt
    disableBtn(); //efter vi raderar input field btn är fortfarande enabled trots tom
}

userInput.addEventListener("input", checkName); //funktion kollar vid varje imput om lenghten blev > 3

userNameSubmitBtn.addEventListener("click", getName);

//litet funktion on keydown, som aktiverar submit name button om user trycker enter istället
userInput.addEventListener("keydown", (pressEnter) => {
    if (pressEnter.code === "Enter") {
        pressEnter.preventDefault();
        userNameSubmitBtn.click();
        userInput.blur();
    }
});
