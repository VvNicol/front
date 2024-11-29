//adminMain.js
/*
import { clubBuscador, clubImgFondoBuscador } from "./clubBuscador.js"
import { toggleDescripcion } from "./utils.js"

const mainContenedor = document.querySelector('#contenedor');

function BuscadorClub() {
    mainContenedor.innerHTML = '';
    const imgFondo = clubImgFondoBuscador();
    const contenido = clubBuscador();

    mainContenedor.append(imgFondo, contenido);

    const form = contenido.querySelector('#searchClubForm');
    const inputBusqueda = contenido.querySelector('#searchClub');
    const resultados = contenido.querySelector('#resultadosClubs');
/*
	async function cargarClubs(criterio = '') {
	    try {
	        const response = await fetch('/admin/buscarClubs', {
	            method: 'POST',
	            headers: { 'Content-Type': 'application/json' },
	            body: JSON.stringify({ criterio }),
	        });

	        if (!response.ok) throw new Error('Error en la solicitud');
	        const clubs = await response.json();

	        const resultados = document.querySelector('#resultadosClubs'); // Asegúrate de que este selector sea correcto
	        resultados.innerHTML = ''; // Limpiar resultados previos

	        if (clubs.length > 0) {
	            clubs.forEach(club => {
	                const li = resultados(club);  // Usar la función importada
	                resultados.appendChild(li);
	            });
	        } else {
	            resultados.innerHTML = `<li class="list-group-item text-light bg-danger">No se encontraron resultados.</li>`;
	        }
	    } catch (error) {
	        console.error(error);
	        resultados.innerHTML = `<li class="list-group-item text-light bg-danger">Error al cargar datos.</li>`;
	    }
	}
    // Cargar todos los datos al iniciar
/*    cargarClubs();

    // Manejar el evento de búsqueda en tiempo real
    inputBusqueda.addEventListener('input', (event) => {
        const criterio = event.target.value.trim(); // Obtener el valor del input
        cargarClubs(criterio); // Llamar a la función con el criterio actualizado
    });

    // Manejar el evento submit del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir recarga de página
        const criterio = inputBusqueda.value.trim();
        cargarClubs(criterio); // Llamar a la función con el criterio de búsqueda
    });
}



function EliminarClub(correo, nombre, actionModal) {
	const actionModalTitle = document.getElementById('actionModalLabel');
	actionModalTitle.textContent = "¿Estas seguro?" ;
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
*/
function EliminarUsuario() {

	mainContenedor.innerHTML = '';
	const imgFondo = imgFondoEliminarUsuario();
	const formulario = eliminarFormularioUsuario();

	mainContenedor.appendChild(imgFondo);
	mainContenedor.appendChild(formulario);


	// Añadir la lógica para eliminar el Usuario
	const eliminationForm = formulario.querySelector('#deleteUsuarioForm');
	eliminationForm.addEventListener('submit', function(event) {
		event.preventDefault();

		const correo = document.getElementById('correo').value;
		const dni = document.getElementById('dni').value;

		// Crear el objeto que se enviará al backend
		const usuarioData = {
			correo: correo,
			dni: dni
		};

		const confirmacion = confirm("¿Estas seguro de que deseas eliminar el usuario?");
		if (confirmacion) {
			// Hacer la solicitud DELETE
			fetch('http://localhost:8099/admin/bajaUsuario', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(usuarioData)
			})
				.then(response => {
					if (!response.ok) {
						throw new Error('Error al eliminar el usuario');
					}
					return response.text();
				})
				.then(data => {
					document.getElementById('correo').value = '';
					document.getElementById('dni').value = '';
					console.log('Usuario eliminado:', data);
					alert('Usuario eliminado exitosamente.');

				})
				.catch(error => {
					console.error('Hubo un problema con la solicitud:', error);
					alert('Error: ' + error.message);
				});
		}
	});
}

/*
function MostrarAlerta(mensaje, tipo = 'success') {
	const alertContainer = document.getElementById('alertContainer');

	// Crear el elemento de la alerta
	const alerta = document.createElement('div');
	alerta.classList.add('alert', 'alert-' + tipo, 'alert-dismissible', 'fade', 'show');
	alerta.setAttribute("role", "alert");
	alerta.innerHTML = `${mensaje} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;

	// Añadir la alerta al contenedor
	alertContainer.appendChild(alerta);

	setTimeout(() => {
		alerta.classList.remove('show');  // Hacer que la alerta se desvanezca
		alertContainer.removeChild(alerta);  // Eliminar el elemento de la alerta
	}, 5000);
}


window.MostrarAlerta = MostrarAlerta;
window.BuscadorClub = BuscadorClub;
window.EliminarClub = EliminarClub;
*/