# Usa un'immagine ufficiale PHP con Apache (versione 8.2 come esempio)
FROM php:8.2-apache

# Copia tutto il contenuto della cartella locale nella cartella di Apache
COPY . /var/www/html/

# Abilita il modulo rewrite se ne hai bisogno per URL rewriting (opzionale)
RUN a2enmod rewrite

# Espone la porta 80
EXPOSE 80

# Il CMD di default dell'immagine php:8.2-apache avvia Apache
