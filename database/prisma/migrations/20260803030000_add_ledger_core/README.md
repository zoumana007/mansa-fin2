# Ajout du noyau Ledger

- Objectif : comptes, journaux, transactions en partie double, écritures et audit financier.
- Nature : migration additive avec contraintes PostgreSQL d’intégrité et catalogue technique minimal.
- Invariants : montants strictement positifs, transaction équilibrée et écritures comptabilisées immuables.
- Risque : faible sur base vide, sans modification des données existantes.
- Validation : Prisma, correspondance SQL, tests du moteur et build.
- Rollback : soumis à approbation en environnement contrôlé.
- Ticket : P0‑06.
- Date : 2026‑08‑03.
