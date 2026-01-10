# Cahier de Recettes API

Une API RESTful construite avec **Node.js**, **Express** et **MongoDB** pour gérer un catalogue de recettes de cuisine.

## Lien de l'API en direct
L'API est déployée sur AlwaysData et peut être testée ici :
 [https://josselinfauconnier.alwaysdata.net/](https://josselinfauconnier.alwaysdata.net/)

---

## Technologies utilisées
- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB Atlas (Mongoose)
- **Authentification** : JWT (JSON Web Tokens)
- **Gestion d'images** : Multer
- **Hébergement** : AlwaysData

---

##  Structure des Dossiers
- `Routes/` : Définit les points de terminaison de l'API.
- `Controleurs/` : Contient la logique métier pour chaque route.
- `Modeles/` : Schémas Mongoose pour les recettes et les utilisateurs.
- `configurationJS/` : Fichiers de configuration (Base de données, Auth, Multer).

---

## Routes principales

### Recettes (`/recettes`)
| Méthode | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/` | Récupérer toutes les recettes |
| **GET** | `/:id` | Récupérer une recette par son ID |
| **POST** | `/` | Créer une nouvelle recette (nécessite Auth + Image(option)) |
| **PUT** | `/:id` | Modifier une recette |
| **DELETE** | `/:id` | Supprimer une recette |
| **POST** | `/:id/commentaires` | Ajouter un commentaire à une recette |

### Utilisateurs (`/utilisateurs`)
| Méthode | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/` | Liste des utilisateurs |
| **POST** | `/` | Inscription d'un nouvel utilisateur |
| **POST** | `/connexion` | Connexion et récupération du Token JWT |
| **PUT** | `/:id` | Modifier un profil |
| **DELETE** | `/:id` | Supprimer un compte |

---

##  Installation locale

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/Josselin-Fauconnier/cahier_de_recettes.git
   cd cahier_de_recettes
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer la base de données** :
   Créer un dossier `configurationJS/` et un fichier `configDB.js` :
   ```javascript
   module.exports = {
       MONGO_URI: "votre_lien_mongodb_atlas"
   };
   ```

4. **Lancer le serveur** :
   ```bash
   npm start
   ```
   Le serveur sera disponible sur `http://localhost:3000`.

---

##  Auteur
**Josselin Fauconnier** - *Projet  formation CDPI Phase 2 - La Plateforme_*
