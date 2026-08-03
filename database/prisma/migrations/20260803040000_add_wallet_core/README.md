# Ajout du noyau Wallet

- Objectif : wallets multi-devises liés un-à-un à un compte Ledger, statuts et audit.
- Nature : migration additive, sans solde mutable et sans opération de paiement.
- Invariants : unicité propriétaire/type/devise/environnement et audit immuable.
- Risque : faible sur base vide, sans modification des données financières existantes.
- Validation : Prisma, correspondance SQL, tests et build.
- Rollback : soumis à approbation en environnement contrôlé.
- Ticket : P0‑07.
- Date : 2026‑08‑03.
