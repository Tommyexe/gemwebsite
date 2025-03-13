document.getElementById("check-form").addEventListener("submit", function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    
    fetch("http://localhost/megwebsite2/submit.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        if(result.includes("Successo")){
            document.getElementById("success").style.display = "block";
        } else {
            document.getElementById("error").style.display = "block";
        }
    })
    .catch(error => {
        console.error("Errore:", error);
        document.getElementById("error").style.display = "block";
    });
});
