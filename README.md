# Backend E-Commerce

Ce projet est un backend pour une application e-commerce, construit avec Node.js, Express.js et MongoDB. Il gère l'authentification, la gestion des produits, des commandes et des utilisateurs, avec une attention particulière à la sécurité et aux performances.

## Technologies Utilisées
- **Node.js** avec **Express.js** pour le serveur backend
- **MongoDB** avec **Mongoose** pour la base de données
- **JSON Web Tokens (JWT)** pour l'authentification
- **Bcrypt** pour le hachage des mots de passe
- **Multer** et **Sharp** pour la gestion et l'optimisation des images
- **Azure Storage Blob** pour le stockage des fichiers
- **Nodemailer** pour l'envoi d'e-mails
- **Helmet** et **XSS** pour la sécurité

## Installation
1. Clonez le dépôt :
   ```sh
   git clone https://github.com/NawfalElHamed/backend-ecommerce.git
   ```
2. Accédez au dossier du projet :
   ```sh
   cd backend-ecommerce
   ```
3. Installez les dépendances :
   ```sh
   npm install
   ```
4. Créez un fichier **.env** à la racine et ajoutez vos variables d'environnement (exemple) :
   ```env
   PORT=5000
   MONGO_URI=votre_mongodb_uri
   JWT_SECRET=your_jwt_secret
   AZURE_STORAGE_CONNECTION_STRING=votre_connection_string
   ```

## Démarrage du serveur
En mode développement avec **nodemon** :
```sh
npm start
```
Le serveur écoute sur le port défini dans le fichier **.env** (par défaut : 5000).

## Routes Principales
### Authentification
- `POST /api/auth/register` - Inscription utilisateur
- `POST /api/auth/login` - Connexion utilisateur

### Produits
- `GET /api/products` - Récupération de tous les produits
- `POST /api/products` - Ajout d'un nouveau produit (admin)

### Commandes
- `POST /api/orders` - Création d'une commande
- `GET /api/orders/:id` - Récupération d'une commande par ID

## Sécurité
- **Helmet** pour protéger contre certaines vulnérabilités Web
- **XSS** pour empêcher les attaques XSS
- **JWT** pour gérer l'authentification sécurisée
- **Bcrypt** pour hacher les mots de passe

## Contribution
Les contributions sont les bienvenues ! Merci de forker le repo et de proposer une Pull Request.

