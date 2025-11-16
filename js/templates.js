// templates.js
// Exporta funções que retornam HTML (strings) para cada "rota".
// Mantemos templates puros e simples; dados dinâmicos são interpolados.

export function templateHome() {
  return `
    <section class="hero">
      <div class="hero-content">
        <h1>Usuários da ONG</h1>
        <p class="lead">Somos uma organização sem fins lucrativos que atua com animais abandonados — resgate, cuidado e adoção responsável.</p>
        <a class="btn btn-primary" href="#/cadastro">Quero Ajudar</a>
      </div>
      <div class="hero-media">
        <img src="imagens/cachorro.svg" alt="Voluntários em ação">
      </div>
    </section>
    <section id="projetos" class="projects-section">
      <h2>Projetos</h2>
      <div class="cards">
        <article class="card">
          <h3>Resgates</h3>
          <p>Atuação emergencial para resgatar animais em situação de risco.</p>
          <span class="badge">Ativo</span>
        </article>
        <article class="card">
          <h3>Clínica Móvel</h3>
          <p>Atendimentos e castrações comunitárias.</p>
          <span class="badge badge-secondary">Em planejamento</span>
        </article>
        <article class="card">
          <h3>Adoção Responsável</h3>
          <p>Processo de adoção com triagem e suporte ao adotante.</p>
          <span class="badge">Aberto</span>
        </article>
      </div>
    </section>
  `;
}

export function templateCadastro(data = {}) {
  // data pode conter valores para preencher o formulário (edição)
  const nome = data.nome || '';
  const email = data.email || '';
  const mensagem = data.mensagem || '';
  return `
    <section id="cadastro">
      <h2>Cadastro de Voluntário / Contato</h2>
      <form id="form-cadastro" class="form" novalidate>
        <div class="form-row">
          <label for="nome">Nome completo</label>
          <input id="nome" name="nome" type="text" required minlength="3" value="${escapeHtml(nome)}" />
          <div class="form-feedback" aria-live="polite"></div>
        </div>

        <div class="form-row">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required value="${escapeHtml(email)}" />
          <div class="form-feedback" aria-live="polite"></div>
        </div>

        <div class="form-row">
          <label for="mensagem">Mensagem</label>
          <textarea id="mensagem" name="mensagem" rows="4">${escapeHtml(mensagem)}</textarea>
        </div>

        <div class="form-actions">
          <button class="btn btn-primary" type="submit">Enviar</button>
          <button class="btn" type="reset">Limpar</button>
        </div>
      </form>

      <section aria-live="polite" class="saved-list">
        <h3>Cadastros salvos</h3>
        <div id="saved-entries"></div>
      </section>
    </section>
  `;
}

export function templateContato() {
  return `
    <section id="contato" class="contact">
      <h2>Contato com ONG Pet</h2>
      <address>
        <p>Endereço: Rua Esperança, 9 - Parque Residencial Bambi - Guarulhos/SP</p>
        <p>Telefone: (11) 98765-4321</p>
        <p>Email: <a href="mailto:contato@ongpet.org.br">contato@ongpet.org.br</a></p>
      </address>
    </section>
  `;
}

// Pequena função de escape para evitar injeção XSS ao interpolar
function escapeHtml(str) {
  return String(str || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
