document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-message');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });
            const text = await response.text();
            const message = text.trim();
            messageDiv.textContent = message;
            alert(message);
            form.reset();
        } catch (err) {
            const errorMsg = "Erreur lors de l'envoi du message.";
            messageDiv.textContent = errorMsg;
            alert(errorMsg);
        }
    });
});
