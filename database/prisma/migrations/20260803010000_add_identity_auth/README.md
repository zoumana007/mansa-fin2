# Ajout du socle Identity et Auth

- Objectif : créer les utilisateurs, méthodes d’authentification, appareils et sessions révocables.
- Nature : migration additive.
- Risque : faible sur une base vide ; aucune table existante n’est modifiée.
- Validation : schéma Prisma, SQL généré, contraintes, index et clés étrangères.
- Rollback : uniquement hors production ou après approbation renforcée.
- Ticket : P0‑04.
- Date : 2026‑08‑03.

La migration ne crée aucun rôle, permission, ledger, wallet ou paiement.
