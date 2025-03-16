// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Effettua la chiamata GET al file PHP (ad es. "get_participants.php")
    fetch('get_participants.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nella risposta della rete');
        }
        return response.json();
      })
      .then(data => {
        console.log('Partecipanti:', data);
        // Salva i dati in una variabile globale per poterli utilizzare nel download
        window.participantsData = data;
        // Visualizza i dati nel DOM
        displayParticipants(data);
      })
      .catch(error => {
        console.error('Si è verificato un errore:', error);
      });
  
    // Listener per il bottone di download (assicurati di avere un elemento con id "downloadButton" nel tuo HTML)
    const downloadButton = document.getElementById('downloadButton');
    if (downloadButton) {
      downloadButton.addEventListener('click', function() {
        downloadExcel(window.participantsData);
      });
    }
  });
  
  // Funzione per visualizzare i partecipanti in una tabella
  function displayParticipants(participants) {
    const container = document.getElementById('participantsContainer');
    if (!container) return;
  
    // Creazione della tabella e definizione di una classe per eventuali stili CSS
    const table = document.createElement('table');
    table.classList.add('participants-table');
  
    // Creazione dell'intestazione della tabella
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Email', 'Guest', 'Kid Guest', 'Notes'];
  
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    // Creazione del corpo della tabella
    const tbody = document.createElement('tbody');
    participants.forEach(participant => {
      const row = document.createElement('tr');
  
      // Nome
      const cellName = document.createElement('td');
      cellName.textContent = participant.name;
      row.appendChild(cellName);
  
      // Email
      const cellEmail = document.createElement('td');
      cellEmail.textContent = participant.email || 'N/A';
      row.appendChild(cellEmail);
  
      // Guest
      const cellGuest = document.createElement('td');
      cellGuest.textContent = participant.guest;
      row.appendChild(cellGuest);
  
      // Kid Guest
      const cellKidGuest = document.createElement('td');
      cellKidGuest.textContent = participant.kid_guest;
      row.appendChild(cellKidGuest);
  
      // Notes
      const cellNotes = document.createElement('td');
      cellNotes.textContent = participant.notes;
      row.appendChild(cellNotes);
  
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
  
    // Pulizia del contenitore e inserimento della tabella
    container.innerHTML = '';
    container.appendChild(table);
  }
  
  // Funzione per scaricare i dati in formato CSV (aperto con Excel)
  // Funzione per scaricare i dati in formato CSV (aperto con Excel)
function downloadExcel(participants) {
    // Usa il BOM per UTF-8 e il punto e virgola come delimitatore
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    
    // Aggiungi l'intestazione della tabella CSV con delimitatori ;
    csvContent += "Name;Email;Guest;Kid Guest;Notes\n";
    
    participants.forEach(participant => {
      // Crea una riga CSV separando i campi con ;
      const row = [
        `"${participant.name}"`,
        `"${participant.email || ''}"`,
        `"${participant.guest}"`,
        `"${participant.kid_guest}"`,
        `"${participant.notes}"`
      ];
      csvContent += row.join(";") + "\n";
    });
    
    // Crea un link temporaneo per scaricare il CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "partecipanti.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  