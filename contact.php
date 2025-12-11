<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

/**
 * Envoie une réponse JSON standardisée et termine le script.
 */
function respond(bool $success, string $message, int $statusCode = 200, array $extra = []): void
{
    http_response_code($statusCode);
    echo json_encode(
        array_merge(['success' => $success, 'message' => $message], $extra),
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Requête non valide.', 405);
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    respond(false, 'Tous les champs sont requis.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Adresse email invalide.', 422);
}

$portfolioEmail = 'faresmzz15@gmail.com';
$subject = 'Nouveau message depuis le portfolio';
$body = sprintf(
    "Nom : %s\nEmail : %s\nDate : %s\n\nMessage :\n%s\n",
    $name,
    $email,
    (new DateTimeImmutable('now', new DateTimeZone('Europe/Paris')))->format(DateTimeInterface::RFC2822),
    $message
);

$headers = [
    'From' => 'Portfolio <no-reply@portfolio.local>',
    'Reply-To' => sprintf('%s <%s>', $name, $email),
    'Content-Type' => 'text/plain; charset=utf-8'
];

$formattedHeaders = '';
foreach ($headers as $key => $value) {
    $formattedHeaders .= $key . ': ' . $value . "\r\n";
}

$logDir = __DIR__ . '/data';
$logFile = $logDir . '/messages.log';

if (!is_dir($logDir) && !mkdir($logDir, 0775, true) && !is_dir($logDir)) {
    respond(false, 'Impossible de préparer le stockage local.', 500);
}

$logEntry = sprintf(
    "[%s] %s <%s>\n%s\n-------------------------\n",
    date('c'),
    $name,
    $email,
    $message
);
if (@file_put_contents($logFile, $logEntry, FILE_APPEND) === false) {
    respond(false, 'Impossible d’enregistrer votre message. Merci de réessayer plus tard.', 500);
}

$mailSent = false;
if (function_exists('mail')) {
    $mailSent = @mail($portfolioEmail, $subject, $body, $formattedHeaders);
}

$responseMessage = $mailSent
    ? 'Merci pour votre message ! Je reviens vers vous très vite.'
    : 'Merci pour votre message ! Je l’ai bien enregistré même si l’envoi de l’email automatique a échoué.';

respond(true, $responseMessage, 200, ['emailSent' => $mailSent]);
