document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');
  });

  const form = document.getElementById('form-cadastro');
  const toast = document.getElementById('toast');

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const nome = form.nome;
    const email = form.email;

    form.querySelectorAll('.form-feedback').forEach(el => el.textContent = '');

    if (nome.value.trim().length < 3) {
      nome.closest('.form-row').querySelector('.form-feedback').textContent =
        "Informe um nome válido.";
      valid = false;
    }

    if (!/.+@.+\..+/.test(email.value)) {
      email.closest('.form-row').querySelector('.form-feedback').textContent =
        "Informe um email válido.";
      valid = false;
    }

    if (!valid) {
      showToast("Existem erros no formulário.");
      return;
    }

    showToast("Formulário enviado com sucesso!");
    form.reset();
  });
});
  