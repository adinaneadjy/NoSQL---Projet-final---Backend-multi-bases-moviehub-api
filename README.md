# 🎬 MovieHub API – Projet Final NoSQL

API backend conçue pour gérer une base de films, enrichir les données avec des métadonnées avancées, proposer des recommandations et optimiser les performances via un système de cache.  
Ce projet illustre une architecture **polyglotte** combinant PostgreSQL, MongoDB et Redis.

---

## Objectif pédagogique

Démontrer la complémentarité entre bases **relationnelles** et **NoSQL** dans une architecture moderne et performante.

---

## Architecture technique

- **Node.js / Express** : serveur API
- **PostgreSQL** : stockage structuré des films
- **MongoDB** : métadonnées flexibles (cast, genres, durée…)
- **Redis** : cache en mémoire + popularité
- **Docker Compose** : orchestration des services

---

##  Installation

### Prérequis

- Docker & Docker Compose installés
- Node.js (si tu veux lancer sans Docker)

### Lancement avec Docker

```bash
docker-compose up --build
```

Les services suivants seront lancés :

- `moviehub-api` (Express)
- `postgres` (PostgreSQL)
- `mongo` (MongoDB)
- `redis` (Redis)

---

##  Structure du projet

```
├── src/                 # Code source de l'API
│   ├── controllers/     # Logique métier
│   ├── routes/          # Endpoints Express
│   ├── models/          # Modèles Prisma
│   └── app.ts           # Point d'entrée
├── prisma/              # Schéma Prisma + migrations
├── scripts/             # Seed PostgreSQL
├── moviehub-frontend/   # Composants frontend (bonus)
├── docker-compose.yml   # Orchestration des services
└── ARCHITECTURE.md      # Documentation technique
```

---

## Endpoints principaux

| Méthode | URL                          | Base utilisée      | Description |
|--------|-------------------------------|---------------------|-------------|
| GET    | `/movies`                     | PostgreSQL          | Liste des films |
| POST   | `/movies`                     | PostgreSQL          | Création d’un film |
| POST   | `/movies/:id/details`         | MongoDB             | Ajout de métadonnées |
| GET    | `/movies/:id/details`         | MongoDB             | Récupération des détails |
| GET    | `/movies/popular`             | Redis + PostgreSQL  | Films les plus populaires |

---

## 📸 Captures d’écran

Les captures sont disponibles dans le dossier `src/` :

- `image-1.png` → Document MongoDB dans Compass  
- `image-2.png` → Clés Redis dans redis-cli  
- `image-3.png` → Appel API `/movies/:id/details` via curl/Postman  
- `image-4.png` → Vue Docker Compose avec les containers




