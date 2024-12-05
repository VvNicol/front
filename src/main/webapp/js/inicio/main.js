// main.js
import { fondoIniciarSesion, formularioInicioSesion } from "./iniciarSesion.js";
import { formularioAltaClub, imgFondoAltaClub} from "./clubAlta.js";
import { formularioAltaUsuario, imgFondoAltaUsuario} from "./usuarioAlta.js";
import { formularioRegistroClub, imgFondoRegistroClub } from "./clubRegistro.js"

import { registro, imgFondoRegistro } from "./registro.js"

import { imgFondoRegistro, registro} from "./registro.js"

import { validateToken} from "../utils/autentificacion.js"
import { contenidoPrincipal } from "./principal.js"; 

const mainContenedor = document.querySelector('#contenedor');

function Registro(){
	mainContenedor.innerHTML = '';
	const fondo = imgFondoRegistro();
	const formulario = registro();

	mainContenedor.appendChild(fondo);
	mainContenedor.appendChild(formulario);
}

function RegistroClub(){
	mainContenedor.innerHTML = '';
	const fondo = imgFondoRegistroClub();
	const formulario = formularioRegistroClub();

	mainContenedor.appendChild(fondo);
	mainContenedor.appendChild(formulario);
}

function IniciarSesion() {
	mainContenedor.innerHTML = '';
	const fondo = fondoIniciarSesion();
	const formulario = formularioInicioSesion();

	mainContenedor.appendChild(fondo);
	mainContenedor.appendChild(formulario);

	// Añadir la lógica de inicio de sesión
	const loginForm = formulario.querySelector('#loginForm');

	loginForm.addEventListener('submit', function(event) {
		event.preventDefault();

		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;

		// Enviar las credenciales al backend
		fetch('http://localhost:8099/api/inicio/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				correo: username,
				contrasenia: password
			})
		})
			.then(response => response.text())  // Usamos .text() porque el cuerpo es un token, no un JSON
			.then(token => {
				if (token) {
					localStorage.setItem('token', token);  // Guarda el token
					validateToken(token);  // Valida el token antes de redirigir
				} else {
					console.error("Error al iniciar sesión:", token);
					alert("Credenciales incorrectas o error al iniciar sesión.");
				}
			})
			.catch(error => {
				console.error("Error en la solicitud:", error.message);
				alert("Error en la solicitud, intente de nuevo.");
			});

	});
}



function AltaUsuario() {
    mainContenedor.innerHTML = '';
    const imgFondo = imgFondoAltaUsuario();
    const formulario = formularioAltaUsuario();

    mainContenedor.appendChild(imgFondo);
    mainContenedor.appendChild(formulario);

    // Añadir la lógica para el registro
    const registrationForm = formulario.querySelector('#registrationForm');
    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const username = document.getElementById('username').value;
        const dni = document.getElementById('dni').value;
		const telefono = document.getElementById('telefono').value;
		const correo = document.getElementById('correo').value;
		const contrasenia = document.getElementById('contrasenia').value;
		const confirmPassword = document.getElementById('confirmPassword').value;

        if (contrasenia !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const data = {
            nombre,
            apellidos,
            username,
			dni,
			telefono,
			correo,
			contrasenia
        };
        // Hacer la solicitud a la API para registrar un nuevo usuario
        fetch('http://localhost:8099/api/inicio/altausuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(result => {
            if (result.id) { // Suponiendo que el ID se genera automáticamente por el servidor
                alert('Error en el registro: ' + result.message);
            } else {
				alert('Registro exitoso');
				window.location.href = '/motos_front/views/usuario.html'; 
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error en la solicitud');
        });
    });
}


function AltaClub() {
    mainContenedor.innerHTML = '';
    const imgFondo = imgFondoAltaClub();
    const formulario = formularioAltaClub();

    mainContenedor.appendChild(imgFondo);
    mainContenedor.appendChild(formulario);

    // Añadir la lógica para el registro
    const registrationForm = formulario.querySelector('#registrationForm');
    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
      	const correo=document.getElementById('correo').value;
		const descripcion=document.getElementById('descripcion').value;
        const contrasenia = document.getElementById('contrasenia').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (contrasenia !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const data = {
            nombre,
            correo,
			descripcion,
            contrasenia
        };

        // Hacer la solicitud a la API para registrar un nuevo usuario
        fetch('http://localhost:8099/api/inicio/altaclub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(result => {
            if (result.id) { // Suponiendo que el ID se genera automáticamente por el servidor
                 alert('Error en el registro: ' + result.message);
            } else {
				alert('Registro exitoso');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error en la solicitud');
        });
    });
}

function Principal() {
    mainContenedor.innerHTML = '';
    const contenido = contenidoPrincipal();
    mainContenedor.appendChild(contenido);
}



window.AltaClub = AltaClub;
window.AltaUsuario = AltaUsuario;
window.IniciarSesion = IniciarSesion;
window.Principal = Principal;
window.RegistroClub = RegistroClub;
window.Registro = Registro;