window.onload = function() {
    const token = getCookie('token');
    const paginaAnterior = getCookie('paginaAnterior');
  
    if (token !== '1234567') {
      window.location.href = 'index.html';
    } else {
      if (paginaAnterior) {
        window.location.href = paginaAnterior;
      } else {
        window.location.href = 'inicio.html'; // Redirecionar para a página principal se não houver página anterior
      }
    }
  };
  
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
  