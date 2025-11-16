// store.js
// API mínima para armazenar cadastros no localStorage

const STORAGE_KEY = 'ongpet_cadastros_v1';

export function getAllCadastros() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao ler localStorage', e);
    return [];
  }
}

export function saveCadastro(entry) {
  const list = getAllCadastros();
  entry.id = Date.now().toString(36);
  list.unshift(entry); // mais recente primeiro
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return entry;
}

export function removeCadastro(id) {
  let list = getAllCadastros();
  list = list.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function clearAllCadastros() {
  localStorage.removeItem(STORAGE_KEY);
}
    