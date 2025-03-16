<?php
header('Content-Type: application/json');

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
    die(json_encode(["error" => "Connessione fallita: " . $conn->connect_error]));
}

// Query per recuperare tutti i partecipanti
$sql = "SELECT * FROM partecipanti";
$result = $conn->query($sql);

$partecipanti = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
        $partecipanti[] = $row;
    }
}

// Restituisce i dati in formato JSON
echo json_encode($partecipanti);

$conn->close();
?>
