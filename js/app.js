// app.js
import { navigateTo } from './router.js';
import { showToast } from './ui.js';

// Hook para botão hambúrguer (header)
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('open');
    });
  }

  // Melhorar links do header: transforma links com href contendo "cadastro" em hash route
  document.querySelectorAll('.main-nav a, .nav-list a').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      // se link já é hash, deixa
      if (href.startsWith('#')) return;
      // previne o reload e navega via hash
      if (href.includes('cadastro')) {
        e.preventDefault();
        navigateTo('/cadastro');
      } else if (href.includes('contato')) {
        e.preventDefault();
        navigateTo('/contato');
      } else {
        // fallback -> home
        e.preventDefault();
        navigateTo('/home');
      }
    });
  });

  // A11y: permitir fechar menu com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const nav = document.getElementById('main-nav');
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        const navToggle = document.querySelector('.nav-toggle');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  showToast('Bem-vindo(a) — SPA carregada', 900);
});
