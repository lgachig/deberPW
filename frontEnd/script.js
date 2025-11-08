async function buscarRaza(nombre) {
  try {
    const response = await fetch(`http://localhost:3001/breed?name=${encodeURIComponent(nombre)}`);
    const dataGet = await response.json();

    const container = document.getElementById('dataContainer');
    container.innerHTML = dataGet.data.map(item => {
      const attr = item.attributes;
      return `
        <div class="col-md-4 col-lg-3">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title text-primary">${attr.name}</h5>
              <p class="card-text small text-muted">${attr.description || 'Sin descripción'}</p>
              <ul class="list-unstyled mb-0">
                <li>🐕 Peso Macho: ${attr.male_weight?.min || '?'}–${attr.male_weight?.max || '?'} kg</li>
                <li>🐩 Peso Hembra: ${attr.female_weight?.min || '?'}–${attr.female_weight?.max || '?'} kg</li>
                <li>🕓 Vida: ${attr.life?.min || '?'}–${attr.life?.max || '?'} años</li>
              </ul>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (dataGet.data.length === 0) {
      container.innerHTML = `<p class="text-center text-muted">No se encontraron resultados.</p>`;
    }

  } catch (error) {
    console.error('Error al buscar datos del backend:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('input[type="search"]');

  input.addEventListener('input', e => {
    const nombre = e.target.value.trim();
    if (nombre.length > 0) {
      buscarRaza(nombre);
    } else {
      cargarDatos(); 
    }
  });
});
