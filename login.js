window.onload = function() {
  const token = getCookie('token');
  const currentPage = window.location.pathname;

  if (!token && currentPage !== '/login.html') {
    window.location.href = 'login.html'; // Redireciona se não houver token e não estiver na página de login
    return;
  }

  if (token !== '1234567' && currentPage !== '/login.html') {
    window.location.href = 'login.html'; // Redireciona se o token não for válido e não estiver na página de login
    return;
  }

  if (token === '1234567' && currentPage === '/login.html') {
    window.location.href = 'index.html'; // Redireciona se o token for válido e estiver na página de login
    return
  }
};

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const acceptCookies = document.getElementById('acceptCookies').checked;

  if (acceptCookies) {
    document.cookie = 'token=1234567; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
  }

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('users.json')
    .then(response => response.json())
    .then(data => {
      const user = data.users.find(u => u.name === username && u.senha === password);
      if (user) {
        const paginaAnterior = getCookie('paginaAnterior');
        if (paginaAnterior) {
          window.location.href = paginaAnterior;
        } else {
          window.location.href = 'index.html';
        }
      } else {
        alert('Credenciais inválidas. Tente novamente.');
      }
    })
    .catch(error => {
      console.error('Erro ao carregar usuários:', error);
    });
});

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