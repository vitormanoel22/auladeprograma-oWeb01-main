document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("main-nav");

  function openMenu() {
    mainNav.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");

    // bloqueia rolagem
    document.body.style.overflow = "hidden";

    // envia foco para o 1º link
    const firstLink = mainNav.querySelector("a");
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");

    // libera rolagem
    document.body.style.overflow = "";

    // retorna foco ao botão
    navToggle.focus();
  }

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  });

  // Fecha no ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Fecha ao clicar em um link
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
});
