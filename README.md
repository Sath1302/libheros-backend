# Libheros – Backend

Ce repository contient la partie backend du test technique Libheros. L’API permet la gestion des utilisateurs, des listes de tâches et des tâches associées, avec authentification sécurisée via JWT.

Le projet est développé avec NestJS, TypeORM et PostgreSQL.

## Stack technique

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT
- bcrypt

## Fonctionnalités implémentées

L’API permet :

- l’inscription d’un utilisateur
- la connexion avec génération d’un token JWT
- la récupération du profil utilisateur connecté
- la création d’une liste
- la modification d’une liste
- la suppression d’une liste (avec suppression des tâches associées)
- la création d’une tâche
- la modification d’une tâche
- la suppression d’une tâche
- le changement de statut d’une tâche

Toutes les routes liées aux listes et aux tâches sont protégées par authentification.

Chaque utilisateur ne peut accéder qu’à ses propres données.

## Installation du projet

Cloner le repository :

git clone LIEN_DU_REPO_BACK

Se placer dans le dossier :

cd libheros-backend

Installer les dépendances :

npm install

## Configuration des variables d’environnement

Créer un fichier .env à la racine du projet :

PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=libheros

JWT_SECRET=secret_jwt

Adapter les valeurs selon votre configuration locale PostgreSQL.

## Base de données

Créer une base PostgreSQL nommée :

libheros

Puis vérifier que les informations correspondent au fichier .env.

## Lancement du projet

Démarrer le serveur :

npm run start:dev

Le backend sera accessible à l’adresse :

http://localhost:3000

## Endpoints principaux

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

## Auteur

Test technique réalisé par NOM PRENOM