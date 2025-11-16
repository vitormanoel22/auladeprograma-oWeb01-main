// router.js
// Roteador simples baseado em hash. Mapeia rotas -> funções que retornam HTML.

import { templateHome, templateCadastro, templateContato } from './templates.js';
import { initFormHandler, renderSavedList } from './formValidation.js';
import { showToast } from './ui.js';

const routes = {
  '': templateHome,
  '/': templateHome,
  '/home': templateHome,
  '/cadastro': templateCadastro,
  '/contato': templateContato
};

export function navigateTo(path) {
  location.hash = '#'+path;
}

function getPathFromHash() {
  return location.hash ? location.hash.slice(1) : '/';
}

function render() {
  const path = getPathFromHash();
  const routeFn = routes[path] || routes['/'];
  const app = document.getElementById('app');
  if (!app) {
    console.error('Elemento #app não encontrado');
    return;
  }

  // Render template
  app.innerHTML = routeFn();

  // After render hooks
  if (path === '/cadastro') {
    initFormHandler();            // conecta validação e submissão
    renderSavedList();            // mostra itens salvos em localStorage
  }

  // Small accessibility announcement
  showToast('Página carregada: ' + path.replace('/','') || 'home', 1200);
}

// Handle initial load and hash changes
window.addEventListener('hashchange', render);
window.addEventListener('load', () => {
  render();
  hookNavLinks(); // transforma links normais em navegação SPA
});

// Converte links de navegação para navegar via hash sem reload
function hookNavLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      // padrão já usa hash -> deixa o browser mudar o hash (que aciona render)
      // prevenimos comportamento default de links externos sem hash
    });
  });

  // Converte links do header que apontavam para arquivos (ex: index.html)
  document.querySelectorAll('.main-nav a, .nav-list a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    // se link local apontando pra #/ ou fragmento, mantém
    if (href.startsWith('#')) return;
    // normalizamos possíveis "index.html" -> '#/home'
    if (href.endsWith('index.html') || href.endsWith('/')) {
      a.setAttribute('href', '#/home');
    } else if (href.includes('cadastro')) {
      a.setAttribute('href', '#/cadastro');
    } else if (href.includes('projeto')) {
      a.setAttribute('href', '#/home');
    } else if (href.includes('contato')) {
      a.setAttribute('href', '#/contato');
    }
  });
}
    