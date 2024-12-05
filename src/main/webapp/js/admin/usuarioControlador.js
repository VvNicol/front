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
