const darkModeBtn = document.querySelector(".dark_mode_button");
const darkTheme = localStorage.getItem("theme");
const darkModeBtnIcon = document.querySelector(".theme_icon");

if (darkTheme) document.body.classList.add("dark");

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", "dark");
    if (!document.body.classList.contains("dark")) {
        localStorage.removeItem("theme");
        darkModeBtnIcon.textContent = "dark_mode";
    } else {
        darkModeBtnIcon.textContent = "light_mode";
    }
});
