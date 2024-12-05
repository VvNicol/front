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

	<main id="contenedor">
				<div class="container-fluid p-0">
					<div class="col">
						<img id="fondo" src="./img/harley-davidson.jpg"
							alt="Foto sobre un motor de moto en blanco y negro"
							class="img-fluid img-loaded">
					</div>
				</div>
				<div class="row">
					<div
						class="col-lg-12 container d-flex justify-content-center align-items-center vh-100">
						<div class="card bg-dark text-light shadow-lg p-4"
							style="width: 600px; background-color: rgba(0, 0, 0, 0.7); border-radius: 10px;">
							<div class="card-body">
								<div class="col-12">
									<img src="./img/biker.jpg" class="img-fluid" alt="Imagen 1">
								</div>
								<button href="#" onclick="AltaUsuario()" type="submit" class="btn w-100 mt-3" style="background-color: #ffbd59; color: black; font-weight: bold;">Registrar usuario</button>
							</div>
						</div>
					</div>
					
				</div>
			</main>
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