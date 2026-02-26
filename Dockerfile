FROM node:23-alpine

WORKDIR /usr/src/app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer toutes les dépendances (dev incluses)
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port Vite
EXPOSE 5173

# Lancer Vite en mode dev
CMD ["npm", "run", "dev", "--", "--host"]