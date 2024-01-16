// SUBMIT NAME DEL

// DOM elementer vi ska använda med submit btn
const userNameSubmitBtn = document.querySelector("#btn");
const userInput = document.querySelector("#userName");
const welcomeText = document.querySelector(".welcome");

userNameSubmitBtn.disabled = true; //btn ska vara disabled på default

//två funktioner som jag kan använda flera gånger, DRY
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

userInput.addEventListener("input", checkName); //funktion kollar vid varje imput om lenghten blev > 3

userNameSubmitBtn.addEventListener("click", (getName) => {
    welcomeText.textContent = `Welcome ${userInput.value} !`; //tar input value och använder den för velkomst text
    userInput.value = ""; //rensar fältet efteråt
    disableBtn(); //efter vi raderar input field btn är fortfarande enabled trots tom
});

//
//
//
//
//
