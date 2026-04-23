# Libheros – Backend

Ce repository contient le backend réalisé pour le test technique Libheros.

Le backend permet de gérer l’authentification des utilisateurs ainsi que la création et la gestion des listes de tâches et des tâches associées. Toutes les routes liées aux données sont protégées avec JWT afin que chaque utilisateur ne puisse accéder qu’à ses propres informations.

Le projet a été développé avec NestJS, TypeORM et PostgreSQL.

## Technologies utilisées

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT
- bcrypt

## Ce que permet l’API

L’API permet :

- de créer un compte utilisateur
- de se connecter
- de récupérer le profil utilisateur connecté
- de créer une liste de tâches
- de modifier une liste
- de supprimer une liste (les tâches associées sont supprimées automatiquement)
- de créer une tâche
- de modifier une tâche
- de supprimer une tâche
- de changer le statut d’une tâche (terminée / en cours)

Chaque utilisateur ne peut accéder qu’à ses propres listes et ses propres tâches.

## Installation du projet

Cloner le repository :

git clone LIEN_DU_REPO_BACK

Puis entrer dans le dossier :

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

Adapter les valeurs selon votre configuration PostgreSQL.

Créer ensuite une base de données PostgreSQL nommée :

libheros

## Lancer le projet

Démarrer le serveur avec :

npm run start:dev

Le backend sera disponible ici :

http://localhost:3000

## Routes principales

Authentification

POST /auth/register  
POST /auth/login  
GET /auth/profile  

Listes

POST /task-lists  
GET /task-lists  
PATCH /task-lists/:id  
DELETE /task-lists/:id  

Tâches

POST /tasks  
GET /tasks/task-list/:taskListId  
GET /tasks/:id  
PATCH /tasks/:id  
DELETE /tasks/:id  

## Remarque

Ce projet a été réalisé dans le cadre du test technique Libheros dans le but de construire une petite application complète avec authentification et gestion de tâches côté backend.

## Auteur

SEBAMALAI Sathush
BUT Informatique - Université Paris Cité
