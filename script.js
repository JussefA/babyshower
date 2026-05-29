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

        await fetch("TU_URL_DE_GOOGLE_SCRIPT", {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(invitados)

        });

        message.textContent = "✨ Información guardada correctamente ✨";

        form.reset();

    } catch (error) {

        console.error(error);

        message.textContent = "Error al guardar";
    }


});
