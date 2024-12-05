//Funcion que muestra la imagen de fondo de la opcion de alta de club con las respectivas propiedades que se le aplican
export function imgFondoAltaClub() {
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

//Funcion que muestra el formulario para registrar un nuevo club
export function formularioAltaClub() {
    const div = document.createElement('div');
    div.classList.add('container', 'd-flex', 'justify-content-center', 'align-items-center', 'vh-100');

    const formulario = `
		<div class="card bg-dark text-light shadow-lg p-4" style="width: 600px; background-color: rgba(0, 0, 0, 0.7); border-radius: 10px;">
	            <div class="card-body">
	                <h2 class="card-title text-center mb-4" style="font-weight: bold; text-transform: uppercase; font-size: 1.5rem;">Registrarse</h2>
	                <form id="registrationForm">
	                    <div class="row mb-3">
	                        <div class="col">
	                            <label for="nombre" class="form-label"><i class="fa-solid fa-user me-2"></i> Nombre:</label>
	                            <input type="text" id="nombre" name="nombre" class="form-control bg-light text-dark" required>
	                        </div>
	                    </div>
	                    <div class="row mb-3">
	                        <div class="col">
	                            <label for="correo" class="form-label"><i class="fa-solid fa-id-card me-2"></i> Correo:</label>
	                            <input type="tel" id="correo" name="correo" class="form-control bg-light text-dark" required>
	                        </div>
	                    </div>
						<div class="row mb-3">
							<div class="col">
							<label for="descripcion" class="form-label"><i class="fa-solid fa-id-card me-2"></i> Descripcion:</label>
							<input type="tel" id="descripcion" name="descripcion" class="form-control bg-light text-dark" required>
							</div>
						</div>
	                    <div class="row mb-3">
	                        <div class="col-md-6">
	                            <label for="contrasenia" class="form-label"><i class="fa-solid fa-lock me-2"></i> Contraseña:</label>
	                            <input type="password" id="contrasenia" name="contrasenia" class="form-control bg-light text-dark" required>
	                        </div>
	                        <div class="col-md-6">
	                            <label for="confirmPassword" class="form-label"><i class="fa-solid fa-lock me-2"></i> Confirmar Contraseña:</label>
	                            <input type="password" id="confirmPassword" name="confirmPassword" class="form-control bg-light text-dark" required>
	                        </div>
	                    </div>
	                    <button type="submit" class="btn w-100 mt-3" style="background-color: #ffbd59; color: black; font-weight: bold;">Registrar</button>
	                </form>
	            </div>
	        </div>

    `;

    div.innerHTML = formulario;

    return div;
}

//Funcion que muestra la imagen de fondo de la web con las respectivas propiedades que se le aplican
function imgFondo() {
    const img = document.createElement('img');
    img.id = 'fondo';
    img.src = "./img/harley-davidson.jpg";
    img.alt = "Foto sobre un motor de moto en blanco y negro";
    img.classList.add('img-fluid');

    return img;
}