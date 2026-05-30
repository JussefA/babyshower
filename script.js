const addGuestBtn = document.getElementById("addGuest");
const guestsContainer = document.getElementById("guestsContainer");
const form = document.getElementById("babyForm");
const message = document.getElementById("message");

let guestIndex = 1;

// AGREGAR NUEVO INVITADO
addGuestBtn.addEventListener("click", () => {

const guestCard = document.createElement("div");

guestCard.classList.add("guest-card");

guestCard.innerHTML = `

    <input type="text" name="nombre" placeholder="Nombre" required>

    <input type="text" name="apellido" placeholder="Apellido" required>

    <div class="checkbox-group">

        <label>
            <input type="radio" name="asistencia_${guestIndex}" value="Asistiré" required>
            Asistiré ✨
        </label>

        <label>
            <input type="radio" name="asistencia_${guestIndex}" value="No asistiré">
            No asistiré
        </label>

    </div>
`;

guestsContainer.appendChild(guestCard);

guestIndex++;
});

// ENVIAR A GOOGLE SHEETS
form.addEventListener("submit", async (e) => {

e.preventDefault();

const saveButton = document.querySelector('button[type="submit"]');

// Evita múltiples clics
saveButton.disabled = true;
addGuestBtn.disabled = true;

saveButton.textContent = "Guardando...";
message.textContent = "Guardando información, espere...";

const guestCards = document.querySelectorAll(".guest-card");

const invitados = [];

guestCards.forEach(card => {

    const nombre = card.querySelector('input[name="nombre"]').value;

    const apellido = card.querySelector('input[name="apellido"]').value;

    const asistencia = card.querySelector('input[type="radio"]:checked').value;

    invitados.push({
        nombre,
        apellido,
        asistencia
    });

});

try {

    await fetch("https://script.google.com/macros/s/AKfycbwFHWVSfDwKZSHAavU5R6zSp93Le7u3E11BHHpJS5zkrDJBIb2Wy4YX12fk2AF5V-ui/exec", {

        method: "POST",

        mode: "no-cors",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(invitados)

    });

    // Pequeña pausa para dar tiempo a Apps Script
    await new Promise(resolve => setTimeout(resolve, 1500));

    message.textContent = "✨ Información guardada correctamente ✨";
    saveButton.textContent = "Guardado";

    form.reset();

} catch (error) {

    console.error(error);

    message.textContent = "❌ Error al guardar";

    saveButton.disabled = false;
    addGuestBtn.disabled = false;

    saveButton.textContent = "Guardar";
}
});
