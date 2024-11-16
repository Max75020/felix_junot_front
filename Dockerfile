# Utiliser une image Node.js pour construire l'application React
FROM node:20 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier tous les fichiers locaux dans le répertoire de travail du conteneur
COPY . .

# Installer les dépendances du projet
RUN npm install

# Construire l'application React en mode production
RUN npm run build

# Utiliser une image Nginx pour servir l'application React en production ou en local
FROM nginx:stable-alpine

# Copier les fichiers générés par la commande npm run build
COPY --from=build /app/build /usr/share/nginx/html

# Copier la configuration personnalisée de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour permettre l'accès au serveur
EXPOSE 80

# Nginx démarre automatiquement, aucune commande supplémentaire nécessaire
