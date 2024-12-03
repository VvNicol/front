//adminMain.js
import { checkPageAndValidate } from "../utils/autentificacion.js"
import { clubBuscador, clubImgFondoBuscador } from "./clubVista.js"
import { cargarClubs } from "./clubControlador.js"

checkPageAndValidate();

const mainContenedor = document.querySelector('#contenedor');

function BuscadorClub() {
    mainContenedor.innerHTML = '';
    const imgFondo = clubImgFondoBuscador();
    const contenido = clubBuscador();

    mainContenedor.append(imgFondo, contenido);

    const form = contenido.querySelector('#searchClubForm');
    const inputBusqueda = contenido.querySelector('#searchClub');
    const resultados = contenido.querySelector('#resultadosClubs');

    cargarClubs('', resultados);

    inputBusqueda.addEventListener('input', (event) => {
        const criterio = event.target.value.trim();
        cargarClubs(criterio , resultados);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const criterio = inputBusqueda.value.trim();
        cargarClubs(criterio, resultados);
    });
}

window.checkPageAndValidate = checkPageAndValidate;
window.BuscadorClub = BuscadorClub;