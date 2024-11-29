// main.js

import { fondoIniciarSesion, formularioInicioSesion } from "./iniciarSesion.js";
import { formularioAltaClub, imgFondoAltaClub} from "./altaClub.js";
import { formularioAltaUsuario, imgFondoAltaUsuario} from "./altaUsuario.js";
import { contenidoPrincipal } from "./principal.js"; // Importar funciones de la API Mock;
import { eliminarFormularioClub, imgFondoEliminarClub } from "./eliminarClub.js";

const mainContenedor = document.querySelector('#contenedor');


function IniciarSesion() {
    mainContenedor.innerHTML = '';
    const fondo = fondoIniciarSesion();
    const formulario = formularioInicioSesion();

    mainContenedor.appendChild(fondo);
    mainContenedor.appendChild(formulario);

    // Añadir la lógica de inicio de sesión
    const loginForm = formulario.querySelector('#loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Enviar las credenciales al backend
        fetch('http://localhost:8099/api/inicio/login', {
            method: 'POST', // Especificamos que es una solicitud POST
            headers: {
                'Content-Type': 'application/json', // Indicamos que los datos son en formato JSON
            },
            body: JSON.stringify({
                correo: username,  // Enviar el correo
                contrasenia: password // Cambia 'password' por 'contrasenia'
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }

            // No intentamos convertir la respuesta en JSON si no es JSON
            return response.text(); // Usamos `text()` para manejar respuestas en texto
        })
        .then(data => {
            // Si la respuesta es exitosa (200 OK), redirigimos
            if (data.includes("Login exitoso")) {
                Principal(); // Llama a la función Principal para mostrar el contenido
				console.log("Inicio exitoso");
            }
        })
        .catch(error => {
            // Maneja el error de la solicitud sin mostrar alertas
            console.error('Error al iniciar sesión:', error);
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

function EliminarClub() {
    mainContenedor.innerHTML = '';
    const imgFondo = imgFondoEliminarClub();
    const formulario = eliminarFormularioClub();

    mainContenedor.appendChild(imgFondo);
    mainContenedor.appendChild(formulario);

    // Añadir la lógica para eliminar el club
    const eliminationForm = formulario.querySelector('#deleteClubForm');
    eliminationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const alias = document.getElementById('alias').value;
        const password = document.getElementById('password').value;

        // Primero, comprobar si el alias y la contraseña son correctos
        fetch('http://localhost:3000/club')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los clubes');
                }
                return response.json();
            })
            .then(clubes => {
                // Buscar el club que coincide con el alias y la contraseña
                const club = clubes.find(club => club.alias === alias && club.password === password);

                if (club) {
                    // Preguntar al usuario si está seguro de eliminar el club
                    const confirmation = window.confirm('¿Está seguro de que desea eliminar este club?');

                    if (confirmation) {
                        // Si el usuario confirma, proceder a eliminar el club
                        return fetch(`http://localhost:3000/club/${club.id}`, { // Asegúrate de que la URL sea correcta
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                    } else {
                        // Si el usuario cancela, simplemente salir de la función
                        alert('Operación cancelada.');
                        return Promise.reject('Operación cancelada.');
                    }
                } else {
                    alert('Alias o contraseña incorrectos.');
                    throw new Error('Alias o contraseña incorrectos.');
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el club');
                }
                return response.json();
            })
            .then(data => {
                console.log('Club eliminado:', data);
                alert('Club eliminado exitosamente.');
                // Aquí puedes actualizar la interfaz de usuario o realizar otras acciones
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud:', error);
                alert('Error: ' + error.message);
            });
    });
}

window.AltaClub = AltaClub;
window.AltaUsuario = AltaUsuario;
window.IniciarSesion = IniciarSesion;
window.Principal = Principal;
window.EliminarClub = EliminarClub;