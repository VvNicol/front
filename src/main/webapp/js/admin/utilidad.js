export function toggleDescripcion(button) {
	const descripcion = button.previousElementSibling; // El span que contiene la descripción
	const isExpanded = descripcion.classList.contains('expanded');

	if (isExpanded) {
		descripcion.classList.remove('expanded');
		descripcion.style.whiteSpace = 'nowrap'; // Restaurar truncado
		descripcion.style.overflow = 'hidden';
		descripcion.style.textOverflow = 'ellipsis';
		button.textContent = 'Ver más';
	} else {
		descripcion.classList.add('expanded');
		descripcion.style.whiteSpace = 'normal'; // Mostrar todo
		descripcion.style.overflow = 'visible';
		descripcion.style.textOverflow = 'clip';
		button.textContent = 'Ver menos';
	}
}

export function MostrarAlerta(mensaje, tipo = 'success') {
	const alertContainer = document.getElementById('alertContainer');

	const alerta = document.createElement('div');
	alerta.classList.add('alert', 'alert-' + tipo, 'alert-dismissible', 'fade', 'show');
	alerta.setAttribute("role", "alert");
	alerta.innerHTML = `${mensaje} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;

	alertContainer.appendChild(alerta);

	setTimeout(() => {
		alerta.classList.remove('show');
		alertContainer.removeChild(alerta);
	}, 5000);
}