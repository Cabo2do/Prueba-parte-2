// ******************************* funcion de alerta *******************************
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
        appendAlert('Esta es una alerta', 'success')
    })
}

// ******************************* funcion popover *******************************
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
const popover = new bootstrap.Popover('.example-popover', {
    container: 'body'
})

// ******************************* funcion toast *******************************
const toastButton = document.querySelector('#toast-button');
const toastContent = document.querySelector('.toast');

if (toastButton) {
    toastButton.addEventListener('click', function () {
        const toast = new bootstrap.Toast(toastContent);
        toast.show();
    });
}

// ******************************* funcion offcanvas *******************************
document.getElementById('contentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;

    // Cambiar contenido de la alerta
    if (alertTrigger) {
        alertTrigger.addEventListener('click', () => {
            appendAlert(descripcion, 'success')
        })
    }

    // Cambiar contenido del popover
    const popoverButton = document.getElementById('popover');
    popoverButton.setAttribute('data-bs-content', descripcion);
    const newPopover = new bootstrap.Popover(popoverButton);
    newPopover.hide(); // Reiniciar el popover para que se actualice el contenido
    newPopover.show();

    // Cambiar contenido del offcanvas
    const offcanvasTitle = document.querySelector('.offcanvas-title');
    const offcanvasBody = document.querySelector('.offcanvas-body');
    offcanvasTitle.textContent = titulo;
    offcanvasBody.innerHTML = `
        <form>
            <div class="mb-3">
                <label for="nombre" class="form-label">${descripcion}</label>
                <input type="text" class="form-control" id="nombre" name="nombre">
            </div>
            <div class="mb-3">
                <label for="clave" class="form-label">ingrese su clave</label>
                <input type="password" class="form-control" id="clave" name="clave">
            </div>
            <button type="submit" class="btn btn-primary">confirmar</button>
        </form>
    `;
});