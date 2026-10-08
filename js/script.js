var container = document.querySelector('.Agent-Contact');
var btn = document.getElementById('saveContact');
var nameInput = document.getElementById('name');
var lastNameInput = document.getElementById('lastName');
var phoneInput = document.getElementById('phone');


//carga de elementos
fetch("http://www.raydelto.org/agenda.php")
.then(response => response.json())
.then(data => {
    const totalSpan = document.getElementById('totalContacts');
    if (totalSpan) totalSpan.textContent = `(${data.length})`;

    container.innerHTML = ''; 
    data.forEach(contact => {
    
        var contactDiv = document.createElement('div');
        contactDiv.classList.add('card');
        
        const initial = (contact.nombre ? contact.nombre.charAt(0) : '?').toUpperCase();

        contactDiv.innerHTML = `
            <div class="card-avatar-wrapper">
                <div class="avatar-placeholder">${initial}</div>
            </div>
            <div class="card-options">
                <i class="bi bi-three-dots"></i>
            </div>
            <div class="card-body">
                <h3 class="contact-name">${contact.nombre} ${contact.apellido}</h3>
                <span class="contact-badge">Contacto</span>
                
                <div class="contact-details">
                    <div class="detail-item">
                        <span class="detail-label"><i class="bi bi-telephone"></i> Teléfono:</span>
                        <span class="detail-value">${contact.telefono || 'N/A'}</span>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(contactDiv);
    });
});

//guardar elementos

btn.addEventListener('click',  e => {

      if(nameInput.value.trim() === ''
            || lastNameInput.value.trim() === '' || phoneInput.value.trim() === '') {
        alert('Por favor, complete todos los campos antes de guardar.');
        return;
    }

    fetch("http://www.raydelto.org/agenda.php", {
        method: "POST",
        headers: {  
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nameInput.value.trim(),
            apellido: lastNameInput.value.trim(),
            telefono: phoneInput.value.trim()
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Contacto guardado:', data);
        nameInput.value = '';
        lastNameInput.value = '';
        phoneInput.value = '';
        location.reload();
    })
    .catch(error => {
        console.error('Error al guardar el contacto:', error);
    });
});