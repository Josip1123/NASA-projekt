const userNameSubmitBtn = document.querySelector("#btn");
const userInput = document.querySelector("#userName");
const welcomeText = document.querySelector(".welcome");

userNameSubmitBtn.disabled = true;

function checkName() {
    if (userInput.value.length >= 3) {
        userNameSubmitBtn.disabled = false;
        userNameSubmitBtn.classList.remove("disabled");
    } else {
        userNameSubmitBtn.disabled = true;
        userNameSubmitBtn.classList.add("disabled");
    }
}

userNameSubmitBtn.addEventListener("click", (getName) => {
    getName.preventDefault();

    const yourName = document.querySelector("#userName").value;
    welcomeText.innerHTML = `Welcome ${yourName} !`;

    userInput.value= "";
    checkName();
});
