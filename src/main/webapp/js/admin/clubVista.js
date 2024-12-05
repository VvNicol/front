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
	img.src = "../img/harley-davidson.jpg";
	img.alt = "Foto sobre un motor de moto en blanco y negro";
	img.classList.add('img-fluid');
	img.style.filter = 'blur(2px)';

	return img;
}