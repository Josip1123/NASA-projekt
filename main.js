const userNameSubmitBtn = document.querySelector("#btn");
const userInput = document.querySelector("#userName");
const welcomeText = document.querySelector(".welcome");

userNameSubmitBtn.disabled = true; //btn ska vara disabled på default


function checkName() {
    // om input tex har mer än 3 char då får man clicka på knappen
    if (userInput.value.length >= 3) {
        userNameSubmitBtn.disabled = false;
        userNameSubmitBtn.classList.remove("disabled");
    } else {
        userNameSubmitBtn.disabled = true;
        userNameSubmitBtn.classList.add("disabled");
    }
}

userInput.addEventListener("input", checkName); //funktion kollar vid varje imput om lenghten blev över 3

userNameSubmitBtn.addEventListener("click", (getName) => {
    welcomeText.textContent = `Welcome ${userInput.value} !`; //tar input value och använder den för velkomst text
    userInput.value = ""; //rensar fältet efteråt
    checkName(); //efter vi raderar input field btn är fortfarande enabled trots tom så jag kallar funktionen att kolla om btn ska vara disabled
});
