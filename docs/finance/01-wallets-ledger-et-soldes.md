# Cahier des charges — Wallets, ledger et gestion des soldes

## 1. Objectif
Le module constitue la source de vérité financière de Mansa pour les wallets, soldes, réservations, transferts, frais, remboursements, comptes techniques et rapprochements. Il est consommé par les applications Client, Commerçant, TPE, Admin, les modules État et les intégrations banque, carte et Mobile Money.

## 2. Principes non négociables
1. Ledger en partie double : chaque écriture comptabilisée est équilibrée.
2. Aucun montant en flottant : utiliser l’unité monétaire minimale sous forme entière.
3. Une écriture `POSTED` est immuable ; toute correction passe par une contre-écriture ou une écriture compensatrice.
4. Toute commande financière mutable exige une clé d’idempotence.
5. Aucun solde n’est modifié directement sans postings correspondants.
6. Les opérations concurrentes ne doivent jamais permettre un double débit.
7. Une devise par compte de ledger ; tout change est explicite.
8. Démo, Recette et Production utilisent des ledgers séparés.
9. Chaque mouvement est traçable par identifiant métier, corrélation et audit.

## 3. Périmètre
- wallets particuliers, commerçants, agents, administrations et comptes techniques ;
- ledger et postings ;
- soldes comptables, disponibles, réservés et en attente ;
- holds, captures, libérations et expirations ;
- transferts internes ;
- frais et commissions ;
- remboursements, reversals et ajustements ;
- comptes de clearing/settlement ;
- rapprochement ;
- restrictions et limites ;
- audit, observabilité et exports financiers.

Les connecteurs externes restent dans des modules dédiés et utilisent ce ledger comme source de vérité.

## 4. Entités minimales
- `Wallet`
- `LedgerAccount`
- `JournalEntry`
- `Posting`
- `BalanceSnapshot`
- `Hold`
- `FinancialTransaction`
- `FeeAssessment`
- `SettlementAccount`
- `ReconciliationRecord`
- `LedgerAdjustmentRequest`
- `FinancialAuditEvent`

Chaque `JournalEntry` contient au minimum : UUID, type d’opération, statut, devise, date de valeur, date de comptabilisation, source métier, référence externe éventuelle, clé d’idempotence, identifiant de corrélation et métadonnées non sensibles.

Une entrée ne peut passer à `POSTED` que si le total des débits est égal au total des crédits.

## 5. Types de wallets
### Client
Wallet principal du particulier, rattaché à une devise et à un pays.

### Commerçant
Reçoit les encaissements, remboursements, règlements et mouvements commerciaux autorisés.

### Agent
Supporte les opérations d’agent, notamment cash-in/cash-out lorsque le produit l’autorise.

### Administration publique
Supporte taxes, amendes, scolarité, bourses ou autres encaissements publics.

### Technique
Comptes de clearing, suspense, frais, commissions, settlement, remboursement ou réserve. Ils ne sont jamais exposés comme wallets utilisateurs ordinaires.

## 6. Soldes
Le module distingue au minimum :
- `ledgerBalance` : solde issu des écritures comptabilisées ;
- `availableBalance` : montant immédiatement dépensable ;
- `reservedBalance` : fonds bloqués par des holds ;
- `pendingCredit` ;
- `pendingDebit`.

Les applications clientes ne recalculent jamais un solde indépendamment du backend.

## 7. Cycle de vie
Statuts wallets : `PENDING`, `ACTIVE`, `RESTRICTED`, `SUSPENDED`, `CLOSING`, `CLOSED`.

La fermeture exige la résolution des holds, opérations en attente et soldes résiduels. L’historique comptable reste conservé.

## 8. Catalogue initial d’opérations
- `WALLET_FUNDING`
- `INTERNAL_TRANSFER`
- `MERCHANT_PAYMENT`
- `CASH_IN`
- `CASH_OUT`
- `CARD_AUTHORIZATION`
- `CARD_CAPTURE`
- `CARD_REVERSAL`
- `MOBILE_MONEY_IN`
- `MOBILE_MONEY_OUT`
- `BANK_TRANSFER_IN`
- `BANK_TRANSFER_OUT`
- `FEE`
- `COMMISSION`
- `REFUND`
- `REVERSAL`
- `SETTLEMENT`
- `ADJUSTMENT`
- `PUBLIC_PAYMENT`

Chaque type référence un schéma de comptabilisation versionné.

## 9. Idempotence
Le backend associe chaque clé d’idempotence à l’acteur, l’opération, l’empreinte des paramètres critiques et le résultat. Une répétition identique retourne le résultat existant. La même clé avec des paramètres différents est rejetée et auditée.

## 10. Atomicité et concurrence
Les débits concurrents sur un même wallet doivent être protégés par des transactions PostgreSQL et un mécanisme de verrouillage ou de versionnement adapté. La transaction métier, les postings et les changements d’état financier critiques doivent rester atomiques autant que possible.

## 11. Holds
Un hold réserve temporairement une partie du solde disponible pour une autorisation carte, un retrait, un paiement ou un transfert externe.

Statuts : `ACTIVE`, `PARTIALLY_CAPTURED`, `CAPTURED`, `RELEASED`, `EXPIRED`.

Une capture ne peut dépasser le montant restant. Une libération restitue le montant réservé. Les expirations sont traitées par un worker idempotent.

## 12. Transferts internes
Parcours minimal :
1. authentifier l’émetteur ;
2. vérifier statuts des wallets ;
3. vérifier KYC, limites et risque ;
4. calculer les frais ;
5. vérifier le solde disponible ;
6. poster les écritures atomiquement ;
7. publier les événements ;
8. déclencher les notifications asynchrones.

Un replay ne doit jamais créer un deuxième débit ou un deuxième crédit.

## 13. Frais et commissions
Le moteur tarifaire calcule les frais ; le ledger les comptabilise. Chaque frais conserve la règle appliquée, sa version, la base de calcul, les minimum/maximum, les taxes éventuelles et le bénéficiaire comptable.

Les commissions agents et partenaires sont des mouvements séparés et auditables.

## 14. Remboursements et reversals
Un remboursement crée une nouvelle transaction liée à l’originale. Il ne modifie jamais les postings historiques. Les remboursements partiels sont autorisés dans la limite du montant restant remboursable.

## 15. Ajustements manuels
Aucun opérateur ne peut éditer directement un solde. Un ajustement exige un motif structuré, un initiateur, les comptes concernés, une trace d’audit et, au-delà d’un seuil configurable, une approbation par une seconde personne.

## 16. Restrictions et limites
Le ledger applique les décisions des modules conformité et risque : interdiction de débit/crédit, gel, blocage partiel, restriction de rail ou suspension temporaire.

Les limites peuvent être définies par transaction, jour, semaine, mois, canal, produit, niveau KYC, pays ou partenaire.

## 17. Multi-devise
Chaque compte de ledger est mono-devise. Toute conversion exige taux, horodatage, source du taux, spread/frais et comptes de change dédiés. La conversion implicite est interdite.

## 18. Clearing, settlement et rapprochement
Les partenaires externes disposent de comptes dédiés permettant de distinguer fonds utilisateurs, créances, dettes, revenus et commissions.

Le rapprochement compare le ledger interne avec les transactions et fichiers/API des partenaires.

Statuts minimum : `MATCHED`, `MISSING_INTERNAL`, `MISSING_EXTERNAL`, `AMOUNT_MISMATCH`, `STATUS_MISMATCH`, `DUPLICATE`, `UNDER_REVIEW`, `RESOLVED`.

Un écart n’est jamais corrigé par modification silencieuse de l’historique.

## 19. APIs principales
- `GET /v1/wallets`
- `GET /v1/wallets/{id}`
- `GET /v1/wallets/{id}/balance`
- `GET /v1/wallets/{id}/transactions`
- `POST /v1/transfers/internal`
- `POST /v1/holds`
- `POST /v1/holds/{id}/capture`
- `POST /v1/holds/{id}/release`
- `POST /v1/refunds`
- `GET /v1/transactions/{id}`
- `POST /v1/admin/adjustments`
- `POST /v1/admin/adjustments/{id}/approve`

Les endpoints administratifs financiers sont protégés par des permissions renforcées.

## 20. Événements métier
- `wallet.created`
- `wallet.activated`
- `wallet.restricted`
- `wallet.closed`
- `financial_transaction.created`
- `financial_transaction.posted`
- `financial_transaction.failed`
- `hold.created`
- `hold.captured`
- `hold.released`
- `hold.expired`
- `transfer.completed`
- `refund.completed`
- `adjustment.posted`
- `reconciliation.mismatch_detected`

Tous les consommateurs d’événements financiers doivent être idempotents.

## 21. Audit et observabilité
L’audit conserve acteur, rôle, organisation, transaction, wallet, action, montant, devise, raison, horodatage, corrélation et approbateur éventuel.

Métriques minimales : volume et valeur des transactions, latence de posting, refus pour solde insuffisant, holds actifs, écarts de rapprochement, ajustements manuels et âge des opérations en attente.

Alerte immédiate en cas d’écriture déséquilibrée, incohérence de solde ou écart de settlement anormal.

## 22. Sécurité
- chiffrement des communications ;
- accès strict par rôle et contexte ;
- aucun accès direct aux tables financières depuis les apps clientes ;
- séparation des responsabilités pour ajustements critiques ;
- secrets partenaires hors dépôt ;
- protection contre rejeu et double soumission.

## 23. Résilience
Les caches ne sont jamais la source de vérité des soldes. Les workers sont redémarrables sans double effet. Les sauvegardes PostgreSQL sont chiffrées et les restaurations sont testées. La reprise doit vérifier l’intégrité comptable avant réouverture complète des traitements.

## 24. Tests obligatoires
- unitaires : soldes, frais, holds, remboursements, limites, postings ;
- intégration : transactions PostgreSQL, concurrence, idempotence, rollback ;
- propriétés : débits = crédits, captures <= hold restant, remboursements <= montant remboursable ;
- charge : lectures de soldes, transferts concurrents, paiements commerçants.

## 25. Critères d’acceptation
1. Aucune écriture déséquilibrée ne peut être comptabilisée.
2. Un ordre rejoué ne produit jamais un second débit.
3. Les débits concurrents respectent le solde disponible.
4. Tout changement de solde est explicable par les postings.
5. Holds, captures, releases et expirations fonctionnent correctement.
6. Les remboursements conservent l’historique.
7. Les écarts de rapprochement sont identifiés sans altération silencieuse.
8. Les ajustements sont contrôlés et auditables.
9. Les tests de comptabilité, concurrence et idempotence passent en CI.
10. Le contrat est réutilisable par paiements, cartes, Mobile Money, TPE, commerçants et modules État.

## 26. Dépendances
Authentification, KYC/KYB, moteur de risque, moteur tarifaire, configuration pays/devise, audit, notifications et intégrations partenaires.

## 27. Hors périmètre initial
Comptabilité générale complète de Mansa, fiscalité universelle, trésorerie prédictive, crédit complexe, change spéculatif et actifs crypto.
