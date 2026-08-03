# Initialisation du schéma technique

- Objectif : créer le registre technique des versions applicatives du schéma.
- Nature : migration additive.
- Risque : faible ; création d’une table vide et d’un index unique.
- Compatibilité : PostgreSQL, sans dépendance applicative.
- Durée estimée : inférieure à une seconde sur une base vide.
- Validation : `pnpm prisma:validate`, `pnpm prisma:generate` et revue du SQL.
- Rollback hors production : supprimer l’index puis la table créée.
- Rollback en production : soumis à approbation ; aucune suppression automatique.
- Ticket : P0‑03.
- Date : 2026‑08‑03.

Cette migration ne contient aucune donnée fonctionnelle et n’anticipe pas Identity, RBAC, Ledger,
Wallet ou Paiements.
