//altaUsuario.js

export function imgFondoRegistro() {
	const divContenedor = document.createElement('div');
	divContenedor.classList.add('container-fluid', 'p-0');

	const divCol = document.createElement('div');
	divCol.className = 'col';

	divContenedor.appendChild(divCol);

	const img = imgFondo();
	divCol.appendChild(img);

	img.onload = function() {
		img.classList.add('img-loaded');
	};
	return divContenedor;
}

export function registro() {
	const div = document.createElement('div');
	div.classList.add('container', 'd-flex', 'justify-content-center', 'align-items-center', 'vh-100');

	const formulario = `

	<div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
		<div class="mb-2 mb-md-0">
			<h5 class="mb-1">
				Club: <span>${club.nombre}</span>
			</h5>
			<p class="mb-0">
				Correo: <span>${club.correo}</span>
			</p>
			<p class="mb-0">
				Descripción: <span class="text-truncate d-inline-block"
					style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
					${club.descripcion} </span>
				<button
					class="btn-expandir-descripcion btn btn-link p-0 text-decoration-none">
					Ver más</button>
			</p>
		</div>
		<div class="d-flex flex-column flex-sm-row">
			<button
				class="btn-eliminar btn btn-danger btn-sm mb-2 mb-sm-0 me-0 me-sm-2"
				data-correo="${club.correo}">Eliminar</button>
			<button class="btn-editar btn btn-custom-warning btn-sm"
				data-id="${club.id}">Editar</button>
		</div>
	</div>

    `;

	div.innerHTML = formulario;

	return div;
}


function imgFondo() {
	const img = document.createElement('img');
	img.id = 'fondo';
	img.src = "./img/harley-davidson.jpg";
	img.alt = "Foto sobre un motor de moto en blanco y negro";
	img.classList.add('img-fluid');

	return img;
}