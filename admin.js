function login() {
  const u = document.getElementById('user').value;
  const p = document.getElementById('pass').value;

  if (u === 'admin' && p === 'admin123') {
    window.location.href = 'index.html';
  } else {
    alert('Wrong Credentials');
  }
}
