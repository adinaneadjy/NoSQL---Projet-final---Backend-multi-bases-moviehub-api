# moviehub-api

Backend Node.js + TypeScript pour gestion de films (Postgres, MongoDB, Redis, ChromaDB)

## Prérequis
- Docker & Docker Compose
- Node.js (optionnel si tu utilises Docker)
- (Optionnel) clé d'API d'un fournisseur d'embeddings si tu veux Chroma avec embeddings externes

## Installation & exécution (Docker)
1. Copier `.env.example` en `.env` et ajuster si nécessaire.
2. Lancer :
   ```bash
   docker-compose up --build
