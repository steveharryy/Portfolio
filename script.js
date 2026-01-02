function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const nameText = "Abhay Kumar Pandit";
const typedNameElement = document.getElementById("typed-name");
let i = 0;

function typeLetter() {
  if (i < nameText.length) {
    typedNameElement.innerHTML += nameText.charAt(i);
    i++;
    setTimeout(typeLetter, 120);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  typeLetter();

  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const menu = document.querySelector(".menu-links");
      const icon = document.querySelector(".hamburger-icon");
      if (menu && menu.classList.contains("open")) {
        menu.classList.remove("open");
        icon.classList.remove("open");
      }
    });
  });

  const profileButtons = document.querySelectorAll(".btn");
  profileButtons.forEach(btn => {
    btn.addEventListener("mouseenter", function() {
      this.style.transform = "scale(1.05)";
    });
    btn.addEventListener("mouseleave", function() {
      this.style.transform = "scale(1)";
    });
  });

  const socialIcons = document.querySelectorAll("#socials-container .icon");
  socialIcons.forEach(icon => {
    icon.addEventListener("mouseenter", function() {
      this.style.transform = "scale(1.2) rotate(5deg)";
    });
    icon.addEventListener("mouseleave", function() {
      this.style.transform = "scale(1) rotate(0)";
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("section").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.6s ease-out";
    observer.observe(section);
  });
});
