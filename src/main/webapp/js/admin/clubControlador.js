import { toggleDescripcion, MostrarAlerta } from "./utilidad.js";

export function cargarClubs(criterio = '', resultados) {

	fetch('http://localhost:8099/admin/buscarClubs', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ criterio }),
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Error en la respuesta del servidor');
			}
			return response.json();
		})
		.then(clubs => {
			resultados.innerHTML = '';
			if (clubs.length > 0) {
				clubs.forEach(club => {
					const li = document.createElement('li');
					li.classList.add('list-group-item', 'bg-dark', 'text-light', 'border-light');
					li.innerHTML = `
                            <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                                <div class="mb-2 mb-md-0">
                                    <h5 class="mb-1">Club: <span id="clubNombre">${club.nombre}</span></h5>
                                    <p class="mb-0">Correo: <span id="clubCorreo">${club.correo}</span></p>
                                    <p class="mb-0">
                                        Descripción: 
                                        <span id="clubDescripcion" class="text-truncate d-inline-block" style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                            ${club.descripcion}
                                        </span>
                                        <button id="btnExpandirDescripcion" class="btn btn-link p-0 text-decoration-none">
                                            Ver más
                                        </button>
                                    </p>
                                </div>
                                <div class="d-flex flex-column flex-sm-row">
                                    <button id="btnEliminar" class="btn btn-danger btn-sm mb-2 mb-sm-0 me-0 me-sm-2" data-correo="${club.correo}">Eliminar</button>
                                    <button id="btnEditar" class="btn btn-custom-warning btn-sm" data-id="${club.id}">Editar</button>
                                </div>
                            </div>
                        `;

					const btnExpandirDescripcion = li.querySelector('#btnExpandirDescripcion');
					btnExpandirDescripcion.addEventListener('click', () => toggleDescripcion(btnExpandirDescripcion));

					const btnEliminar = li.querySelector('#btnEliminar');
					btnEliminar.addEventListener('click', () => {
						const actionModalTitle = document.getElementById('actionModalLabel');
						const actionModalElement = document.getElementById('actionModal');
						const actionModal = new bootstrap.Modal(actionModalElement, {
							backdrop: 'static',
							keyboard: false
						});
						const actionModalMessage = document.getElementById('actionModalMessage');
						const confirmButton = document.getElementById('confirmButton');
						const cancelButton = document.getElementById('salirButton');

						actionModalTitle.textContent = "Eliminar Club";
						actionModalMessage.textContent = `¿Estás seguro de eliminar el club: "${club.nombre}"?`;

						confirmButton.onclick = null;
						confirmButton.onclick = () => EliminarClub(club.correo, club.nombre, actionModal);
						cancelButton.onclick = () => actionModal.hide();
						actionModal.show();
					});

					const btnEditar = li.querySelector('#btnEditar');
					btnEditar.addEventListener('click', () => MostrarAlerta('Función de edición en desarrollo'));

					resultados.appendChild(li);
				});
			} else {
				resultados.innerHTML = `<li class="list-group-item text-light bg-danger">No se encontraron resultados.</li>`;
			}
		})
		.catch(error => {
			console.error(error);
			resultados.innerHTML = `<li class="list-group-item text-light bg-danger">Hubo un error al realizar la búsqueda.</li>`;
		});
}

function EliminarClub(correo, nombre, actionModal) {
	const actionModalTitle = document.getElementById('actionModalLabel');
	actionModalTitle.textContent = "¿Estas seguro?";
	actionModalMessage.textContent = `¿Está realmente seguro de eliminar el club: "${nombre}"? Esta acción no se puede deshacer.`;

	confirmButton.onclick = function() {
		fetch('http://localhost:8099/admin/bajaClub', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ correo })
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Error al eliminar el club');
				}
				return response.text();
			})
			.then(data => {
				actionModalTitle.textContent = "Se ha eliminado";
				actionModalMessage.textContent = `¡El club "${nombre}" fue eliminado exitosamente!`;
				confirmButton.style.display = 'none'; // Ocultar el botón de confirmar
				console.log(data);
			})
			.catch(error => {
				actionModalTitle.textContent = "Ocurrio algo mal";
				actionModalMessage.textContent = `Hubo un error: "${error}" al eliminar el club. Intenta nuevamente.`;
				confirmButton.style.display = 'none'; // Ocultar el botón de confirmar
				actionModal.hide();
			})
		const actionModalElement = document.getElementById('actionModal');
		actionModalElement.addEventListener('hidden.bs.modal', function() {
			BuscadorClub(); // Llama a la función para actualizar la lista de clubes cuando el modal se cierra
		});
	};
}

window.cargarClubs = cargarClubs;
window.EliminarClub = EliminarClub;