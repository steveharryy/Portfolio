function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}


// Typing effect for name
const nameText = "Abhay Kumar Pandit";
const typedNameElement = document.getElementById("typed-name");
let i = 0;

function typeLetter() {
  if (i < nameText.length) {
    typedNameElement.innerHTML += nameText.charAt(i);
    i++;
    setTimeout(typeLetter, 150); // adjust speed here
  }
}

window.addEventListener("DOMContentLoaded", () => {
  typeLetter();
});
