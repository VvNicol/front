export function buscadorUsuario() {
    const div = document.createElement('div');
    div.classList.add('container', 'd-flex', 'justify-content-center', 'align-items-center', 'vh-100');

    const formulario = `
		<div class="card bg-dark text-light shadow-lg p-4" style="width: 600px; background-color: rgba(0, 0, 0, 0.7); border-radius: 10px;">
	            <div class="card-body">
	                <h2 class="card-title text-center mb-4" style="font-weight: bold; text-transform: uppercase; font-size: 1.5rem;">Buscar Usuario</h2>
	                <form id="searchUsuarioForm">
	                    <div class="input-group">
	                        <input type="text" id="searchUsuario" name="searchUsuario" class="form-control bg-light text-dark" placeholder="Ingresa el nombre del usuario" required>
	                        <button type="submit" class="btn" style="background-color: #ffbd59; color: black; font-weight: bold;">Buscar</button>
	                    </div>
	                </form>
	                <ul id="resultadosClubs" class="list-group mt-3"></ul>
	            </div>
	     </div>
    `;

    div.innerHTML = formulario;

    return div;
}
export function imgFondoBuscadorUsuario() {
    const divContenedor = document.createElement('div');
    divContenedor.classList.add('container-fluid', 'p-0');

    const divCol = document.createElement('div');
    divCol.className = 'col';

    divContenedor.appendChild(divCol);

    const img = imgFondo();
    divCol.appendChild(img);

    img.onload = function () {
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

    return img;
}