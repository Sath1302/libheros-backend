# Libheros – Backend

Bonjour Monsieur Florian Compiegne j'espere que vous allez bien je vais simplement vous expliquer comment ouvrir le projet localement et testé meme si je pense que vous savez deja comment faire , j'ai séparé le back et le front comme lors de ma SAE de fin d'année je trouvais ca plus simple et facile a comprendre.

Bien cordialement , 

Sathush Sebamalai 

Ce repository contient le backend du test technique Libheros réalisé avec NestJS.

Il permet de gérer l’authentification utilisateur ainsi que les listes de tâches et les tâches associées via une API sécurisée avec JWT.

## Installation

Cloner le repository :

git clone https://github.com/Sath1302/libheros-backend

Se placer dans le dossier :

cd libheros-backend

Installer les dépendances :

npm install

## Configuration

Créer un fichier `.env` à la racine du projet avec par exemple :

PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=libheros

JWT_SECRET=secret_jwt

Créer ensuite une base PostgreSQL nommée :

libheros

## Lancer le projet

Démarrer le serveur avec :

npm run start:dev

Le backend sera accessible sur :

http://localhost:3000

SEBAMALAI Sathush
BUT Informatique - Université Paris Cité
