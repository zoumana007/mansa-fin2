# Ajout du noyau RBAC

- Objectif : rôles, permissions, affectations portées et audit des accès.
- Nature : migration additive avec catalogue technique de permissions, sans donnée métier.
- Risque : faible sur base vide, sans modification des tables financières.
- Validation : Prisma, correspondance SQL, index et clés étrangères.
- Rollback : soumis à approbation en environnement contrôlé.
- Ticket : P0‑05.
- Date : 2026‑08‑03.
