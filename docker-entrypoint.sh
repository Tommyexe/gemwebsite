#!/bin/bash
# Se la variabile PORT è impostata, sostituisci la porta di default (80) con $PORT
if [ -n "$PORT" ]; then
  sed -i "s/Listen 80/Listen ${PORT}/g" /etc/apache2/ports.conf
  sed -i "s/<VirtualHost \*:80>/<VirtualHost *:${PORT}>/g" /etc/apache2/sites-available/000-default.conf
fi

# Esegui il comando originale (apache2-foreground)
exec "$@"
