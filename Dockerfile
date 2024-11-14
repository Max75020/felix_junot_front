# Utiliser l'image de Node pour construire le projet
FROM node:20 AS build

WORKDIR /app
COPY . .

# Installer les dépendances et créer le build de production
RUN npm install
RUN npm run build

# Utiliser une image Nginx pour servir l'application en production
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copier la configuration personnalisée de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour la production
EXPOSE 80

# Aucune commande à exécuter, Nginx démarre automatiquement
