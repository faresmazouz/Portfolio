<?php
// Vérifiez si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Validation des champs
    if (!empty($name) && !empty($email) && !empty($message)) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Destinataire de l'email
            $to = "faresmzz15@gmail.com"; 
            $subject = "Nouveau message de votre portfolio";
            $body = "Nom: $name\nEmail: $email\nMessage:\n$message";
            $headers = "From: $email";

            // Envoi de l'email
            if (mail($to, $subject, $body, $headers)) {
                echo "Message envoyé avec succès. Merci de nous avoir contacté !";
            } else {
                echo "Une erreur est survenue. Veuillez réessayer plus tard.";
            }
        } else {
            echo "Adresse email invalide.";
        }
    } else {
        echo "Tous les champs sont requis.";
    }
} else {
    echo "Requête non valide.";
}
?>
