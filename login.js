window.onload = function() {
    const token = getCookie('token');
    const currentPage = window.location.pathname;
  
    // Verifica se não está na página de login e se o token não é válido, redireciona para a página de login
    if (currentPage !== '/login.html' && token !== '1234567') {
      window.location.href = 'login.html';
    }
  
    // Se está na página de login e o token é válido, redireciona para a página inicial
    if (currentPage === '/login.html' && token === '1234567') {
      window.location.href = 'index.html';
      alert('Você ja esta logado');
    }
  };
  
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const acceptCookies = document.getElementById('acceptCookies').checked;
  
    // Define o token nos cookies se aceitar os cookies
    if (acceptCookies) {
      document.cookie = 'token=1234567; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
      console.log('cookie ativado');
    }
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    fetch('users.json')
      .then(response => response.json())
      .then(data => {
        const user = data.users.find(u => u.name === username && u.senha === password);
        if (user) {
          // Exibe a mensagem de login bem-sucedido
          const mensagem = document.createElement('p');
          mensagem.textContent = 'Login bem-sucedido! Redirecionando em 3 segundos...';
          console.log('Login bem-sucedido! Redirecionando em 3 segundos...')
          document.body.appendChild(mensagem);
  
          // Redireciona após 3 segundos
          setTimeout(function() {
            const paginaAnterior = getCookie('paginaAnterior');
            if (paginaAnterior) {
              window.location.href = paginaAnterior;
            } else {
              window.location.href = 'index.html'; // Redirecionar após o login
            }
          }, 3000);
        } else {
          alert('Credenciais inválidas. Tente novamente.');
        }
      })
      .catch(error => {
        console.error('Erro ao carregar usuários:', error);
      });
  });
  
  // Função para obter o valor de um cookie
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return '';
  }  