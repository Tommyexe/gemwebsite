<?php
// Configurazione del database
$servername = "turntable.proxy.rlwy.net";
$username   = "root";
$password   = "tRvensEvHnRDMoPRuSTCrCaWMiOJWIpr";
$dbname     = "railway";
$port       = 29208;

// Creazione della connessione
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verifica della connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Recupero dei dati inviati dal form
$name = $_POST['name'];
$email = $_POST['email'];
$guest = $_POST['guest'];
$events = $_POST['events'];
$notes = $_POST['notes'];

// Preparazione della query per evitare SQL injection
$stmt = $conn->prepare("INSERT INTO partecipanti (name, email, guest, events, notes) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssiss", $name, $email, $guest, $events, $notes);

if ($stmt->execute()) {
    echo "Successo";
} else {
    echo "Errore: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
