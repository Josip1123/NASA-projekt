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

userInput.addEventListener("input", checkName);

userNameSubmitBtn.addEventListener("click", (getName) => {

    welcomeText.textContent = `Welcome ${userInput.value} !`;
    userInput.value = "";
});
