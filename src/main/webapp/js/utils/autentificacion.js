// authentication.js
export function validateToken(token) {

	
    fetch('http://localhost:8099/api/inicio/validate', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Token inválido o sesión expirada.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);
        if (data.role === "ROLE_ADMIN" || data.role === "ROLE_USER") {
            console.log(`Sesión iniciada como ${data.role}`);
            Redirigir(data.role);
			return true;
        } else {
            console.error("Rol desconocido:", data);
            alert("Rol desconocido en la respuesta del servidor.");
            window.location.href = '/motos_front/'; 
			return false;
        }
    })
    .catch(error => {
        console.error("Error en la validación del token:", error.message);
        alert(error.message); // Muestra un mensaje de error al usuario
        window.location.href = '/motos_front/';
		return false;
    });
}

function Redirigir() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert("No se encontró un token válido. Por favor, inicia sesión.");
        window.location.href = '/'; // Redirige al inicio de sesión
        return;
    }

    fetch('http://localhost:8099/api/inicio/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos del dashboard.');
        }
        return response.json();
    })
    .then(data => {
        console.log("Datos recibidos:", data);
        if (data.redirect) {
            window.location.href = data.redirect; // Redirige a la vista especificada
        } else {
            console.error("No se encontró la URL de redirección en la respuesta.");
            alert("Error al redirigir, por favor intenta nuevamente.");
        }
    })
    .catch(error => {
        console.error("Error durante la solicitud:", error.message);
        alert("Error durante la solicitud al dashboard.");
        window.location.href = '/'; // Redirige al inicio de sesión en caso de error
    });
}

export function checkPageAndValidate() {
    const currentPage = window.location.pathname;

    // Recorta el prefijo '/motos_front' si es necesario
    const relativePage = currentPage.replace('/motos_front', '');  // Elimina el prefijo

    // Solo ejecuta la validación en páginas protegidas
    if (relativePage === '/views/admin.html' || relativePage === '/views/usuario.html') {
        console.log('Validando token para página protegida:', relativePage);
        
        // Verifica si ya se validó el token
        const isValidated = localStorage.getItem('isValidated');

        if (isValidated) {
            console.log("Token ya validado, no es necesario repetir.");
            return; // No realiza la validación de nuevo
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.warn('No se encontró un token, redirigiendo a inicio de sesión');
            window.location.href = '../views/noAutorizado.html'; // Redirige a página de acceso no autorizado
        } else {
            validateToken(token); // Valida el token
            localStorage.setItem('isValidated', 'true'); // Marca que la validación fue hecha
        }
    } else {
        console.log('Página no protegida, sin necesidad de validación:', relativePage);
    }
}
