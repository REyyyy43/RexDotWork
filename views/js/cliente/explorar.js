// JS para mostrar servicios disponibles a clientes

function mostrarServicios(servicios) {
  const cont = document.getElementById('servicios-list');
  if (!servicios.length) {
    cont.innerHTML = '<div class="text-gray-500 text-center">No hay servicios publicados.</div>';
    return;
  }
  cont.innerHTML = servicios.map(s => `
    <div class="bg-white p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <div class="font-bold text-lg">${s.titulo}</div>
        <div class="text-gray-700 mb-2">${s.descripcion}</div>
        <div class="text-blue-700 font-semibold">${s.precio} USDT</div>
        <div class="text-sm text-gray-500">Categoría: ${s.categoria}</div>
        <div class="text-sm text-gray-500">Freelancer: ${s.freelancer?.nombre || 'N/A'} (${s.freelancer?.email || ''})</div>
      </div>
      <button class="mt-4 md:mt-0 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onclick="alert('Funcionalidad de contratar próximamente')">Contratar</button>
    </div>
  `).join('');
}

async function cargarServicios() {
  const res = await fetch('/api/servicios');
  const data = await res.json();
  mostrarServicios(data);
}

window.onload = cargarServicios;
