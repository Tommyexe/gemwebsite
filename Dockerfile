# Usa un'immagine base con PHP + Apache
FROM php:8.2-apache

# Copia tutti i file del tuo progetto nella cartella di Apache
COPY . /var/www/html/

# Abilita il modulo rewrite se ne hai bisogno
RUN a2enmod rewrite

# Copia lo script di entrypoint e rendilo eseguibile
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Imposta lo script come entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]

# Comando di default per avviare Apache
CMD ["apache2-foreground"]

# Facoltativo: dichiara la porta 80 (anche se Railway usa PORT, è buono per documentare)
EXPOSE 80
