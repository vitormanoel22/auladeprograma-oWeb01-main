<main id="main-content" tabindex="-1">

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');

  navToggle.setAttribute("aria-haspopup", "true");

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');

    if (!expanded) {
      mainNav.querySelector("a").focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Fechar com tecla ESC (WCAG)
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      navToggle.focus();
    }
  });
});
