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
$name      = $_POST['name'] ?? '';
$email     = $_POST['email'] ?? '';
$guest     = $_POST['guest'] ?? 0;
$kid_guest = $_POST['kid_guest'] ?? 0;
$notes     = $_POST['notes'] ?? '';

// Preparazione della query
$stmt = $conn->prepare("
    INSERT INTO partecipanti (name, email, guest, kid_guest, notes) 
    VALUES (?, ?, ?, ?, ?)
");

// Bind dei parametri (s = string, i = integer)
$stmt->bind_param("ssiis", $name, $email, $guest, $kid_guest, $notes);

// Esecuzione e controllo
if ($stmt->execute()) {
    echo "Successo";
} else {
    echo "Errore: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
