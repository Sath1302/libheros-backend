# Libheros Backend

Backend du test technique Libheros développé avec NestJS, TypeORM et PostgreSQL.

## Fonctionnalités

- Authentification avec JWT
- Inscription utilisateur
- Connexion utilisateur
- Récupération du profil utilisateur connecté
- Gestion des listes de tâches
- Gestion des tâches
- Sécurisation des routes avec JWT
- Isolation des données par utilisateur
- Réponses API nettoyées

## Stack technique

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT
- bcrypt

## Installation

Cloner le projet :

git clone https://github.com/Sath1302/libheros-backend.git

Puis :

cd libheros-backend

Installer les dépendances :

npm install

## Configuration

Créer un fichier .env à la racine du projet avec :

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=libheros
JWT_SECRET=super_secret_key

## Lancer le projet

npm run start:dev

## Authentification

Workflow :

1. créer un utilisateur avec /auth/register
2. se connecter avec /auth/login
3. récupérer le access_token
4. utiliser ce token dans les routes protégées avec Bearer Token

## Endpoints principaux

Auth

POST /auth/register  
POST /auth/login  
GET /auth/profile  

Task lists

POST /task-lists  
GET /task-lists  
PATCH /task-lists/:id  
DELETE /task-lists/:id  

Tasks

POST /tasks  
GET /tasks/:id  
GET /tasks/task-list/:taskListId  
PATCH /tasks/:id  
PATCH /tasks/:id/complete  
DELETE /tasks/:id  

## Sécurité

- Routes protégées par JWT
- Accès limité aux données de l'utilisateur connecté
- Mot de passe jamais exposé dans les réponses API

## Organisation Git

Le projet utilise :

- main
- develop
- feature branches

## Auteur

Projet réalisé par Sathu dans le cadre du test technique Libheros.