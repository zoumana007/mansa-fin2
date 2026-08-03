# Socle de données Mansa

Ce dossier matérialise l’architecture PostgreSQL et Prisma définie par la documentation officielle.

## Organisation

- `prisma/schema.prisma` : source de vérité du schéma applicatif.
- `prisma/migrations` : historique SQL immuable des migrations.
- `apps/api-gateway/src/generated/prisma` : client généré localement et non suivi dans Git.
- `seeds` : futurs jeux de données fictifs séparés par environnement.
- `scripts` : futurs contrôles et opérations de données.

## Commandes

```bash
pnpm prisma:format
pnpm prisma:validate
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:deploy
pnpm prisma:status
```

Les commandes qui accèdent à PostgreSQL exigent `DATABASE_URL`. Copiez `.env.example` vers `.env`
et adaptez uniquement votre environnement local. Aucun secret réel ne doit être ajouté à Git.

`prisma db push` n’est pas une méthode de déploiement autorisée. Toute évolution persistante du
schéma doit passer par une migration versionnée et revue.
