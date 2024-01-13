const userNameSubmitBtn = document.querySelector("#btn");
const userInput = document.querySelector("#userName");

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
    const welcomeText = document.querySelector(".welcome");
    const yourName = document.querySelector("#userName").value;
    welcomeText.innerHTML = `Welcome ${yourName} !`;
    
    userInput.value= "";
    checkName();
});
