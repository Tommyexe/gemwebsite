FROM php:8.2-apache

# Copia il tuo progetto
COPY . /var/www/html/

# Abilita mod_rewrite se necessario
RUN a2enmod rewrite

# Imposta il ServerName in un file di configurazione dedicato
RUN echo "ServerName localhost" > /etc/apache2/conf-available/servername.conf \
    && a2enconf servername

# Espone la porta 80
EXPOSE 80
