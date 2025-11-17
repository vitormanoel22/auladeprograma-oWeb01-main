document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  document.getElementById("theme-light").addEventListener("click", () => {
    root.className = "";
    localStorage.setItem("theme", "light");
  });

  document.getElementById("theme-dark").addEventListener("click", () => {
    root.className = "theme-dark";
    localStorage.setItem("theme", "dark");
  });

  document.getElementById("theme-contrast").addEventListener("click", () => {
    root.className = "theme-contrast";
    localStorage.setItem("theme", "contrast");
  });

  // Carrega tema salvo
  const saved = localStorage.getItem("theme");
  if (saved === "dark") root.className = "theme-dark";
  if (saved === "contrast") root.className = "theme-contrast";
});
