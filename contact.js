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
            messageDiv.textContent = text.trim();
            form.reset();
        } catch (err) {
            messageDiv.textContent = "Erreur lors de l'envoi du message.";
        }
    });
});
