// main.js

import { fondoIniciarSesion, formularioInicioSesion } from "./iniciarSesion.js";
import { formularioAltaClub, imgFondoAltaClub} from "./clubAlta.js";
import { formularioAltaUsuario, imgFondoAltaUsuario} from "./usuarioAlta.js";
import { formularioRegistroClub, imgFondoRegistroClub } from "./clubRegistro.js"
import { contenidoPrincipal } from "./principal.js"; 

const mainContenedor = document.querySelector('#contenedor');

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

function validateToken(token) {
	fetch('http://localhost:8099/api/inicio/validate', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
		.then(response => response.json())  // Esperamos JSON para obtener el rol
		.then(data => {
			console.log('Respuesta del servidor:', data);
			if (data.role === "ROLE_ADMIN") {
				console.log("Sesión iniciada como ADMIN");
				// Redirige a la página de admin
				Redirigir();
			} else if (data.role === "ROLE_USER") {
				console.log("Sesión iniciada como USER");
				Redirigir(); // Llama a la función redirigir
			} else {
				console.error("Rol desconocido:", data);
				alert("Rol desconocido en la respuesta del servidor.");
			}
		})
		.catch(error => {
			console.error("Error en la validación del token:", error.message);
			alert(error.message); // Muestra un mensaje de error al usuario
		});
}

function Redirigir() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert("No se encontró un token válido. Por favor, inicia sesión.");
        window.location.href = '/'; // Redirigir al inicio o página de login
        return;
    }

    fetch('http://localhost:8099/api/inicio/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Enviar el token si es necesario
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Cambia a .json() para obtener un objeto JSON
        } else {
            throw new Error("Error en la redirección: " + response.statusText);
        }
    })
    .then(data => {
        if (data.redirectUrl) {
            console.log("Redirigiendo a: " + data.redirectUrl);
            window.location.href = data.redirectUrl; // Redirige a la URL recibida del backend
        } else {
            console.error("No se recibió una URL de redirección.");
            alert("Error: No se pudo determinar la redirección.");
            window.location.href = '/'; // Redirigir al inicio si no hay URL
        }
    })
    .catch(error => {
        console.error("Error en la redirección:", error.message);
        alert("Error al redirigir al dashboard: " + error.message);
        window.location.href = '/'; // Redirigir al inicio en caso de error
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
                alert('Registro exitoso');
				
                 // Cambia a la vista de inicio de sesión
            } else {
                alert('Error en el registro: ' + result.message);
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
                alert('Registro exitoso');
                 // Cambia a la vista de inicio de sesión
            } else {
                alert('Error en el registro: ' + result.message);
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

window.Redirigir= Redirigir;
window.AltaClub = AltaClub;
window.AltaUsuario = AltaUsuario;
window.IniciarSesion = IniciarSesion;
window.Principal = Principal;
window.RegistroClub = RegistroClub;