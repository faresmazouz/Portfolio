document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-message');

    if (!form || !messageDiv) return;

    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        messageDiv.textContent = '';
        messageDiv.className = 'form-message';

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
        }

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            const payload = await response.json().catch(() => ({
                success: false,
                message: "Réponse inattendue du serveur."
            }));

            messageDiv.textContent = payload.message || "Message envoyé.";
            messageDiv.classList.add(payload.success ? 'success' : 'error');

            if (payload.success) {
                form.reset();
            }
        } catch (error) {
            console.error('Erreur d’envoi du formulaire :', error);
            messageDiv.textContent = "Erreur lors de l'envoi du message. Merci de réessayer.";
            messageDiv.classList.add('error');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Envoyer';
            }
        }
    });
});
