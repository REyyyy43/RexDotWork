// views/js/auth/auth.js
// import { renderLogin, renderRegister, renderPanel } from './components.js';
// Línea comentada porque components.js no existe

// Elimina o comenta estas líneas si no usas root en tu HTML
// const root = document.getElementById('root');
// function show(component) {
//   root.innerHTML = '';
//   root.appendChild(component);
// }

// Navegación simple
function toggleForm(form) {
  document.getElementById('registro-container').style.display = form === 'registro' ? 'block' : 'none';
  document.getElementById('login-container').style.display = form === 'login' ? 'block' : 'none';
  document.getElementById('registro-error').textContent = '';
  document.getElementById('registro-success').textContent = '';
  document.getElementById('login-error').textContent = '';
  document.getElementById('login-success').textContent = '';
}

function validarRegistro(nombre, email, password, tipo, binance) {
  if (!nombre || nombre.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Email inválido.';
  if (!password || password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
  if (!tipo) return 'Selecciona el tipo de usuario.';
  if (!binance || !/^[0-9A-Za-z]{6,}$/.test(binance)) return 'ID de cuenta Binance inválido.';
  return '';
}

function mostrarPanel(usuario) {
  document.getElementById('registro-container').style.display = 'none';
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('panel-container').style.display = 'block';
  document.getElementById('panel-info').innerHTML = `
    <b>Nombre:</b> ${usuario.nombre}<br>
    <b>Email:</b> ${usuario.email}<br>
    <b>Tipo:</b> ${usuario.tipo}<br>
    <b>Cuenta Binance:</b> ${usuario.binance}<br>
    <b>Fecha de registro:</b> ${new Date(usuario.fechaRegistro).toLocaleString()}
  `;
}

function logout() {
  localStorage.removeItem('token');
  location.reload();
}

// Esperar a que el DOM esté listo antes de acceder a los elementos
window.onload = async function() {
  // Manejar formularios solo si existen en la página
  const registroForm = document.getElementById('registro-form');
  if (registroForm) {
    registroForm.onsubmit = async function(e) {
      e.preventDefault();
      const nombre = document.getElementById('reg-nombre').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const tipo = document.getElementById('reg-tipo').value;
      const binance = document.getElementById('reg-binance').value.trim();
      const error = validarRegistro(nombre, email, password, tipo, binance);
      if (error) {
        document.getElementById('registro-error').textContent = error;
        return;
      }
      try {
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, email, password, tipo, binance })
        });
        const data = await res.json();
        if (!res.ok) {
          document.getElementById('registro-error').textContent = data.mensaje || 'Error en el registro';
        } else {
          document.getElementById('registro-success').textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
          document.getElementById('registro-form').reset();
        }
      } catch (err) {
        document.getElementById('registro-error').textContent = 'Error de red.';
      }
    };
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.onsubmit = async function(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      try {
        const res = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) {
          document.getElementById('login-error').textContent = data.mensaje || 'Error al iniciar sesión';
        } else {
          document.getElementById('login-success').textContent = '¡Login exitoso!';
          localStorage.setItem('token', data.token);
          // Redirigir según el tipo de usuario
          if (data.usuario.tipo === 'freelancer') {
            window.location.href = '/freelancer/servicios.html';
          } else if (data.usuario.tipo === 'cliente') {
            window.location.href = '/cliente/explorar.html';
          } else {
            mostrarPanel(data.usuario);
          }
        }
      } catch (err) {
        document.getElementById('login-error').textContent = 'Error de red.';
      }
    };
  }

  // Mostrar panel si ya hay token
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const res = await fetch('/api/users/me', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data = await res.json();
      if (res.ok) mostrarPanel(data);
    } catch (e) {}
  }
};
