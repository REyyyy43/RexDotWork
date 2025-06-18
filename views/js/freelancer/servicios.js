// JS para publicar y listar servicios

function mostrarServicios(servicios) {
  const cont = document.getElementById('servicios-list');
  if (!servicios.length) {
    cont.innerHTML = '<div class="text-gray-500 text-center">No hay servicios publicados.</div>';
    return;
  }
  cont.innerHTML = servicios.map(s => `
    <div class="bg-white p-4 rounded shadow">
      <div class="font-bold text-lg">${s.titulo}</div>
      <div class="text-gray-700 mb-2">${s.descripcion}</div>
      <div class="text-blue-700 font-semibold">${s.precio} USDT</div>
      <div class="text-sm text-gray-500">Categoría: ${s.categoria}</div>
      <div class="text-sm text-gray-500">Freelancer: ${s.freelancer?.nombre || 'N/A'} (${s.freelancer?.email || ''})</div>
    </div>
  `).join('');
}

async function cargarServicios() {
  const res = await fetch('/api/servicios');
  const data = await res.json();
  mostrarServicios(data);
}

document.getElementById('servicio-form').onsubmit = async function(e) {
  e.preventDefault();
  const token = localStorage.getItem('token');
  if (!token) {
    document.getElementById('servicio-error').textContent = 'Debes iniciar sesión para publicar.';
    return;
  }
  const titulo = document.getElementById('titulo').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const precio = document.getElementById('precio').value;
  const categoria = document.getElementById('categoria').value.trim();
  if (!titulo || !descripcion || !precio || !categoria) {
    document.getElementById('servicio-error').textContent = 'Todos los campos son obligatorios.';
    return;
  }
  try {
    const res = await fetch('/api/servicios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ titulo, descripcion, precio, categoria })
    });
    const data = await res.json();
    if (!res.ok) {
      document.getElementById('servicio-error').textContent = data.mensaje || 'Error al publicar servicio';
      document.getElementById('servicio-success').textContent = '';
    } else {
      document.getElementById('servicio-success').textContent = '¡Servicio publicado!';
      document.getElementById('servicio-error').textContent = '';
      document.getElementById('servicio-form').reset();
      cargarServicios();
    }
  } catch (err) {
    document.getElementById('servicio-error').textContent = 'Error de red.';
    document.getElementById('servicio-success').textContent = '';
  }
};

window.onload = cargarServicios;
