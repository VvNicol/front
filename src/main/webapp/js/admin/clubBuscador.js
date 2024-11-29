export function clubBuscador() {
	const div = document.createElement('div');
	div.classList.add('container', 'position-relative', 'vh-100', 'align-items-center');

	const contenido = `
			<div id="club" class="card text-light p-4 mx-auto">
			    <div class="card-body">
			        <div id="alertContainer" class="mb-4"></div>
			        <h2 id="tituloBuscarClub" class="card-title text-center mb-4">
			            Buscar Club
			        </h2>
			        <form id="searchClubForm">
			            <div class="input-group">
			                <input type="text" id="searchClub" name="searchClub" class="form-control bg-dark text-light" placeholder="Ingresa el nombre del club" required>
			                <button type="submit" id="btnBuscar" class="btn" style="">Buscar</button>
			            </div>
			        </form>
		
			        <!-- Contenedor con scroll -->
			        <div id="resultadosClubsContainer">
			            <ul id="resultadosClubs" class="list-group">
			                <!-- Los clubs se agregarán dinámicamente aquí -->
			            </ul>
			        </div>
			    </div>
			</div>


			<!-- Modal de Confirmación de Acción -->
			<div class="modal fade" id="actionModal" tabindex="-1" aria-labelledby="actionModalLabel" aria-hidden="true">
			  <div class="modal-dialog">
			    <div id="modal-content" class="modal-content">
			      <div id="modal-header" class="modal-header">
			        <h5 id="actionModalLabel" class="modal-title">Confirmar Acción</h5>
			        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			      </div>
			      <div class="modal-body" id="actionModalMessage">
			        ¿Estás seguro de realizar esta acción?
			      </div>
			      <div class="modal-footer" style="border-top: 1px solid #dee2e6;">
			        <button type="button" class="btn btn-secondary" id="salirButton" data-bs-dismiss="modal">Salir</button>
			        <button type="button" class="btn btn-primary" id="confirmButton">Confirmar</button>
			      </div>
			    </div>
			  </div>
			</div>

			<!-- Modal para Mensajes de Éxito/Error -->
			<div class="modal fade" id="messageModal" tabindex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
			  <div class="modal-dialog">
			    <div id="modal-content" class="modal-content">
			      <div id="modal-header" class="modal-header">
			        <h5 id="messageModalLabel" class="modal-title">Mensaje</h5>
			        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			      </div>
			      <div id="messageModalMessage" class="modal-body">
			        Mensaje aquí...
			      </div>
			      <div class="modal-footer" style="border-top: 1px solid #dee2e6;">
			        <button type="button" class="btn btn-secondary" id="x" data-bs-dismiss="modal">Cerrar</button>
			      </div>
			    </div>
			  </div>
			</div>
    `;

	div.innerHTML = contenido;

	return div;
}

export function resultados(club) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'bg-dark', 'text-light', 'border-light');

    li.innerHTML = `
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <div class="mb-2 mb-md-0">
                <h5 class="mb-1">Club: <span>${club.nombre}</span></h5>
                <p class="mb-0">Correo: <span>${club.correo}</span></p>
                <p class="mb-0">
                    Descripción: 
                    <span class="text-truncate d-inline-block" style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${club.descripcion}
                    </span>
                    <button class="btn-expandir-descripcion btn btn-link p-0 text-decoration-none">
                        Ver más
                    </button>
                </p>
            </div>
            <div class="d-flex flex-column flex-sm-row">
                <button class="btn-eliminar btn btn-danger btn-sm mb-2 mb-sm-0 me-0 me-sm-2" data-correo="${club.correo}">
                    Eliminar
                </button>
                <button class="btn-editar btn btn-custom-warning btn-sm" data-id="${club.id}">
                    Editar
                </button>
            </div>
        </div>
    `;

    li.querySelector('.btn-expandir-descripcion').addEventListener('click', () => {
        toggleDescripcion(li.querySelector('.btn-expandir-descripcion'));
    });

    li.querySelector('.btn-eliminar').addEventListener('click', () => {
        // Aquí puedes implementar la lógica de eliminación
    });

    return li;
}


export function clubImgFondoBuscador() {
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

function imgFondo() {
	const img = document.createElement('img');
	img.id = 'fondo';
	img.src = "./img/harley-davidson.jpg";
	img.alt = "Foto sobre un motor de moto en blanco y negro";
	img.classList.add('img-fluid');
	img.style.filter = 'blur(2px)';

	return img;
}