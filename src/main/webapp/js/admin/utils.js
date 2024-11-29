export function toggleDescripcion(button) {
    const descripcion = button.previousElementSibling; // El span que contiene la descripción
    const isExpanded = descripcion.classList.contains('expanded');

    if (isExpanded) {
        descripcion.classList.remove('expanded');
        descripcion.style.whiteSpace = 'nowrap'; // Restaurar truncado
        descripcion.style.overflow = 'hidden';
        descripcion.style.textOverflow = 'ellipsis';
        button.textContent = 'Ver más';
    } else {
        descripcion.classList.add('expanded');
        descripcion.style.whiteSpace = 'normal'; // Mostrar todo
        descripcion.style.overflow = 'visible';
        descripcion.style.textOverflow = 'clip';
        button.textContent = 'Ver menos';
    }
}
