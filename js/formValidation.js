// formValidation.js
// Regras de consistência, mensagens, e integração com store.js
import { saveCadastro, getAllCadastros, removeCadastro } from './store.js';
import { showToast } from './ui.js';

// Interface pública
export function initFormHandler() {
  const form = document.getElementById('form-cadastro');
  if (!form) return;

  form.addEventListener('submit', onSubmit);
  form.addEventListener('input', onInputChange);

  // delegado para remover itens salvos
  document.getElementById('saved-entries')?.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-remove-id]');
    if (btn) {
      const id = btn.getAttribute('data-remove-id');
      removeCadastro(id);
      renderSavedList();
      showToast('Cadastro removido.');
    }
  });
}

function onInputChange(e) {
  const target = e.target;
  // validações em tempo real simples
  if (target.name === 'nome') {
    const fb = target.closest('.form-row').querySelector('.form-feedback');
    if (target.value.trim().length < 3) fb.textContent = 'Nome muito curto';
    else fb.textContent = '';
  }
  if (target.name === 'email') {
    const fb = target.closest('.form-row').querySelector('.form-feedback');
    if (!validateEmail(target.value)) fb.textContent = 'Formato de email inválido';
    else fb.textContent = '';
  }
}

function onSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const mensagem = form.mensagem.value.trim();

  // consistência: nome não pode conter números; email domínio válido; mensagem > 10 chars se preenchida
  let valid = true;

  clearAllFeedback(form);

  if (nome.length < 3) {
    setFeedback(form.nome, 'Informe um nome com pelo menos 3 caracteres.');
    valid = false;
  } else if (/\d/.test(nome)) {
    setFeedback(form.nome, 'Nome não pode conter números.');
    valid = false;
  }
function setFeedback(inputEl, message) {
  const row = inputEl.closest('.form-row');
  const fb = row.querySelector('.form-feedback');
  
  const fbId = inputEl.id + "-feedback";
  fb.id = fbId;
  inputEl.setAttribute("aria-describedby", fbId);

  fb.textContent = message;
  fb.setAttribute("role", "alert");
  fb.setAttribute("aria-live", "assertive");

  inputEl.focus();
  inputEl.classList.add('input-error');
  setTimeout(() => inputEl.classList.remove('input-error'), 800);
}

  if (!validateEmail(email)) {
    setFeedback(form.email, 'Informe um email válido (ex: nome@dominio.com).');
    valid = false;
  } else if (!isAllowedDomain(email)) {
    setFeedback(form.email, 'Use um email com domínio comum (ex: gmail, outlook, hotmail, ongpet.org.br).');
    valid = false;
  }

  if (mensagem && mensagem.length > 0 && mensagem.length < 10) {
    const textarea = form.mensagem;
    setFeedback(textarea, 'Se enviar mensagem, escreva pelo menos 10 caracteres.');
    valid = false;
  }

  // cross-field consistency example: if email domain is corporate (example.com),
  // require a message explaining interesse (>= 20 chars) — demonstra checagem cruzada
  if (valid) {
    const domain = email.split('@')[1] || '';
    if (domain.endsWith('corporate.com') && mensagem.length < 20) {
      setFeedback(form.mensagem, 'Para emails corporativos, descreva seu interesse (>=20 caracteres).');
      valid = false;
    }
  }

  if (!valid) {
    showToast('Há erros no formulário. Corrija e tente novamente.');
    return;
  }

  // salvar
  const entry = saveCadastro({ nome, email, mensagem, createdAt: new Date().toISOString() });
  showToast('Cadastro salvo com sucesso!');
  form.reset();
  renderSavedList();
}

function clearAllFeedback(form) {
  form.querySelectorAll('.form-feedback').forEach(el => el.textContent = '');
}

function setFeedback(inputEl, message) {
  const row = inputEl.closest('.form-row');
  const fb = row.querySelector('.form-feedback');
  fb.textContent = message;
  // foco e highlight breve
  inputEl.focus();
  inputEl.classList.add('input-error');
  setTimeout(() => inputEl.classList.remove('input-error'), 800);
}

function validateEmail(email) {
  // validação simples e robusta o suficiente para propósito didático
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAllowedDomain(email) {
  // Domínios permitidos (exemplo); ajustável
  const allowed = ['gmail.com','hotmail.com','outlook.com','yahoo.com','ongpet.org.br'];
  const domain = (email.split('@')[1] || '').toLowerCase();
  // permite subdomínios também (e.g. mail.ongpet.org.br)
  return allowed.some(d => domain === d || domain.endsWith('.' + d));
}

// Renderiza listagem de cadastros salvos
export function renderSavedList() {
  const container = document.getElementById('saved-entries');
  if (!container) return;
  const list = getAllCadastros();
  if (!list.length) {
    container.innerHTML = '<p>Nenhum cadastro salvo ainda.</p>';
    return;
  }
  container.innerHTML = list.map(item => savedItemHtml(item)).join('');
}

function savedItemHtml(item) {
  const escapedName = escapeHtml(item.nome);
  const escapedEmail = escapeHtml(item.email);
  const escapedMsg = escapeHtml(item.mensagem || '');
  return `
    <div class="card saved-item" style="margin-bottom:var(--space-2);">
      <strong>${escapedName}</strong>
      <div>${escapedEmail}</div>
      ${escapedMsg ? `<p>${escapedMsg}</p>` : ''}
      <div style="margin-top:0.5rem;">
        <button class="btn" data-remove-id="${item.id}" type="button">Remover</button>
      </div>
    </div>
  `;
}

// Helpers (re-export store getter to avoid circular import)
import * as Store from './store.js';
const { getAllCadastros } = Store;
export { getAllCadastros };

function escapeHtml(str) {
  return String(str || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
