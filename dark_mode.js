const darkModeBtn = document.querySelector(".dark_mode_button");
const darkTheme = localStorage.getItem("theme");
const darkModeBtnIcon = document.querySelector(".theme_icon");

if (darkTheme) {
    document.body.classList.add("dark_mode_style");
    darkModeBtnIcon.textContent = "light_mode";
}

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark_mode_style");
    localStorage.setItem("theme", "dark");
    if (!document.body.classList.contains("dark_mode_style")) {
        localStorage.removeItem("theme");
        darkModeBtnIcon.textContent = "dark_mode";
    } else {
        darkModeBtnIcon.textContent = "light_mode";
    }
});

// enkel dark mode men hjälp av locale storage. Sparar "theme" value i local storage , users val kvarstår även vid refresh